import { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosResponse } from 'axios'
import getDaysBetweenTwoDate from 'utils/getDaysBetweenTwoDate'
import addBackendUrlToImageUrl from 'utils/addBackendUrlToImageUrl'
import paginateData from 'utils/paginateData'
import { BACKEND_URL } from 'constants/constants'
import { SnsPostForMainPage } from 'types/snsPost'
import { FashionStyle } from 'types/fashion'
import { Nullable } from 'types/common'

const TWO_DAYS = 2

const ADD_ADDITIONAL_INFO_MESSAGE =
  '추가 정보 세 개 중 하나밖에 작성되지 않았네요! 두 가지 이상을 작성하시면 맞춤형 게시물을 보실 수 있습니다! 지금 정보를 수정하러 가 볼까요?'

const showMessageAboutAddingAdditionalInfo = () =>
  console.log(ADD_ADDITIONAL_INFO_MESSAGE) // 임시 코드 - console.log 말고 다른 형태로 메시지 보여줄 예정

const fetchSnsPosts = async (): Promise<AxiosResponse> => {
  return axios({
    method: 'get',
    url: `${BACKEND_URL}/api/sns-posts`,
    params: {
      'populate[0]': 'postImages',
      'populate[1]': 'likeUsers',
      'populate[2]': 'author',
    },
  })
}

const sanitizedSnsPosts = (snsPostsFromStrapi: any): SnsPostForMainPage[] => {
  return snsPostsFromStrapi.map((snsPost: any) => ({
    id: snsPost.id,
    createdAt: snsPost.attributes.createdAt,
    author: {
      username: snsPost.attributes.author.data.attributes.username,
      gender: snsPost.attributes.author.data.attributes.gender,
      bodyShape: snsPost.attributes.author.data.attributes.bodyShape,
      fashionStyles: snsPost.attributes.author.data.attributes.fashionStyles,
    },
    postImage: {
      url: addBackendUrlToImageUrl(
        snsPost.attributes.postImages.data[0].attributes.url
      ),
      altText: snsPost.attributes.postImages.data[0].attributes.alternativeText,
    },
    likeUsers: snsPost.attributes.likeUsers.data,
  }))
}

const filterSnsPosts = async (
  req: NextApiRequest,
  res: NextApiResponse<SnsPostForMainPage[]>
) => {
  // 1. query 받아오기
  const pageNumber = req.query.pageNumber ? Number(req.query.pageNumber) : null
  const pageSize = req.query.pageSize ? Number(req.query.pageSize) : null
  const isLoggedIn = req.query.isLoggedIn === 'true' ? true : false
  const myGender = req.query.myGender ? String(req.query.myGender) : null
  const myBodyShape = req.query.myBodyShape
    ? String(req.query.myBodyShape)
    : null
  const myFashionStyles: Nullable<FashionStyle[]> = req.query.myFashionStyles
    ? JSON.parse(decodeURIComponent(String(req.query.myFashionStyles)))
    : null

  // 2. strapi에 모든 SNS 게시물 데이터 요청해서 받아오기
  let snsPostsFromStrapi
  try {
    const response = await fetchSnsPosts()
    snsPostsFromStrapi = response.data.data
  } catch (error) {
    console.error(error)
  }

  // 3. strapi에서 받아온 SNS 게시물 데이터 정제하기
  const snsPosts = sanitizedSnsPosts(snsPostsFromStrapi)

  // 4. 정제한 SNS 게시물 데이터 필터링하기
  // TODO: 컴포넌트 섹션별로 분리, filterSnsPostsByMyInfo 함수 쪼개기 (→ 코드 정리 필요!!)
  // TODO: 페이지 렌더링 될 때마다 SNS 포스트 순서 랜덤하게 섞이는 것에 대한 처리 어떻게 해야 할지 결정하고 반영하기

  // (1) 최근 이틀 간 올라온 SNS 게시물만 필터링 해 주는 함수
  const filterRecentlyCreatedSnsPosts = (
    snsPosts: SnsPostForMainPage[]
  ): SnsPostForMainPage[] => {
    return snsPosts.filter(snsPost => {
      const today = new Date()
      const snsPostCreatedAt = new Date(snsPost.createdAt)
      const isCreatedInLast2Days =
        getDaysBetweenTwoDate(snsPostCreatedAt, today) < TWO_DAYS
      return isCreatedInLast2Days
    })
  }

  // (2) SNS 게시물들을 랜덤으로 섞어주는 함수
  const randomizeSnsPosts = (
    snsPosts: SnsPostForMainPage[]
  ): SnsPostForMainPage[] => {
    return snsPosts.sort(() => Math.random() - 0.5)
  }

  // (3) 로그인 한 유저의 정보와 비슷한 정보를 가진 유저들이 올린 SNS 게시물들만 보여주는 함수
  const filterSnsPostsByMyInfo = (
    snsPosts: SnsPostForMainPage[]
  ): SnsPostForMainPage[] => {
    if (!isLoggedIn) {
      return snsPosts
    }

    if (myGender && myBodyShape && myFashionStyles) {
      return snsPosts.filter(snsPost =>
        snsPost.author.gender === myGender &&
        snsPost.author.bodyShape === myBodyShape &&
        snsPost.author.fashionStyles
          ? snsPost.author.fashionStyles.some(authorFashionStyle =>
              myFashionStyles.some(
                myFashionStyle => authorFashionStyle.id === myFashionStyle.id
              )
            )
          : false
      )
    }

    if (myGender && myBodyShape) {
      return snsPosts.filter(
        snsPost =>
          snsPost.author.gender === myGender &&
          snsPost.author.bodyShape === myBodyShape
      )
    }

    if (myGender && myFashionStyles) {
      return snsPosts.filter(snsPost =>
        snsPost.author.gender === myGender && //
        snsPost.author.fashionStyles
          ? snsPost.author.fashionStyles.some(authorFashionStyle =>
              myFashionStyles.some(
                myFashionStyle => authorFashionStyle.id === myFashionStyle.id
              )
            )
          : false
      )
    }

    if (myBodyShape && myFashionStyles) {
      return snsPosts.filter(snsPost =>
        snsPost.author.bodyShape === myBodyShape && //
        snsPost.author.fashionStyles
          ? snsPost.author.fashionStyles.some(authorFashionStyle =>
              myFashionStyles.some(
                myFashionStyle => authorFashionStyle.id === myFashionStyle.id
              )
            )
          : false
      )
    }

    if (myGender || myBodyShape || myFashionStyles) {
      showMessageAboutAddingAdditionalInfo()
      return snsPosts
    }

    if (!myGender && !myBodyShape && !myFashionStyles) {
      return snsPosts
    }

    return snsPosts // 타입 에러 막기 위한 임시 코드
  }

  const filteredSnsPostsByMyInfo = filterSnsPostsByMyInfo(snsPosts)
  const recentlyCreatedSnsPosts = filterRecentlyCreatedSnsPosts(
    filteredSnsPostsByMyInfo
  )
  const filteredSnsPosts = randomizeSnsPosts(recentlyCreatedSnsPosts)

  // 5-1. 요청 쿼리에 pageNumber, pageSize 둘 다 있는 경우, 필터링 된 SNS 게시물 데이터에서 특정 페이지를 추출해서 내려주기
  if (pageNumber && pageSize) {
    const paginatedSnsPosts = paginateData({
      dataArray: filteredSnsPosts,
      pageNumber,
      pageSize,
    })
    res.status(200).json(paginatedSnsPosts as SnsPostForMainPage[])
  }

  // 5-2. 요청 쿼리에 pageNumber, pageSize 중 하나라도 빠져있는 경우, 필터링 된 SNS 게시물 데이터 내려주기
  if (!pageNumber || !pageSize) {
    res.status(200).json(filteredSnsPosts)
  }
}

export default filterSnsPosts
