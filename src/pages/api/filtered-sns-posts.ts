import { NextApiRequest, NextApiResponse } from 'next'
import fetchSnsPosts from 'services/snsPost/fetchSnsPosts'
import paginateData from 'utils/paginateData'
import getSafeStringFromQuery from 'utils/getSafeStringFromQuery'
import getSafeNumberFromQuery from 'utils/getSafeNumberFromQuery'
import { USER_FASHION_STYLES } from 'constants/user'
import { SnsPostResponseAboutFiltering } from 'types/snsPost'
import { FashionStyle } from 'types/fashion'
import { Nullable } from 'types/common'
import { Image } from 'types/image'
import { UserWithAttributes } from 'types/user'

export type SnsPostForMainPage = {
  id: number
  createdAt: string
  author: {
    username: string
    gender: Nullable<string>
    bodyShape: Nullable<string>
    fashionStyles: Nullable<FashionStyle[]>
  }
  postImage: Image
  likeUsers: UserWithAttributes[]
}

const ADD_ADDITIONAL_INFO_MESSAGE =
  '추가 정보 세 개 중 하나밖에 작성되지 않았네요! 두 가지 이상을 작성하시면 맞춤형 게시물을 보실 수 있습니다! 지금 정보를 수정하러 가 볼까요?'

const FASHION_STYLE_NAMES = USER_FASHION_STYLES.map(
  fashionStyle => fashionStyle.name
)

// TODO: console.log가 아닌 다른 형태로 메시지 보여주기
const showMessageAboutAddingAdditionalInfo = () =>
  console.log(ADD_ADDITIONAL_INFO_MESSAGE)

const filterSnsPosts = async (
  req: NextApiRequest,
  res: NextApiResponse<SnsPostForMainPage[]>
) => {
  const { query } = req

  // 1. query 받아오기
  const pageNumber = getSafeNumberFromQuery(query.pageNumber)
  const pageSize = getSafeNumberFromQuery(query.pageSize)
  const isLoggedIn = getSafeStringFromQuery(query.isLoggedIn) === 'true'
  const myGender = getSafeStringFromQuery(query.myGender)
  const myBodyShape = getSafeStringFromQuery(query.myBodyShape)
  const myFashionStyles = getSafeFashionStylesFromQuery(query.myFashionStyles)

  try {
    // 2. strapi에 모든 SNS 게시물 데이터 요청해서 받아오기
    const response = await fetchSnsPosts()
    const snsPostsFromStrapi = response.data.data

    // 3. strapi에서 받아온 SNS 게시물 데이터 정제하기
    const snsPosts = sanitizedSnsPosts(snsPostsFromStrapi)

    // 4. 정제한 SNS 게시물 데이터 필터링하기
    // (로그인 한 유저의 정보와 비슷한 정보를 가진 유저들이 올린 SNS 게시물들만 필터링)
    const filteredSnsPostsByMyInfo = filterSnsPostsByMyInfo({
      snsPosts,
      isLoggedIn,
      myGender,
      myBodyShape,
      myFashionStyles,
    })

    // 5-1. 요청 쿼리에 pageNumber, pageSize 둘 다 있는 경우, 필터링 된 SNS 게시물 데이터에서 특정 페이지를 추출해서 내려주기
    if (pageNumber && pageSize) {
      const paginatedSnsPosts = paginateData({
        dataArray: filteredSnsPostsByMyInfo,
        pageNumber,
        pageSize,
      })
      res.status(200).json(paginatedSnsPosts as SnsPostForMainPage[])
    }

    // 5-2. 요청 쿼리에 pageNumber, pageSize 중 하나라도 빠져있는 경우, 필터링 된 SNS 게시물 데이터 내려주기
    if (!pageNumber || !pageSize) {
      res.status(200).json(filteredSnsPostsByMyInfo)
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

export default filterSnsPosts

const getSafeFashionStylesFromQuery = (
  queryValue: string | string[]
): Nullable<FashionStyle[]> => {
  if (typeof queryValue !== 'string') {
    return null
  }

  const decodedQueryValue = decodeURIComponent(queryValue)
  const parsedArray = JSON.parse(decodedQueryValue)

  if (!(parsedArray instanceof Array)) {
    return null
  }

  const fashionStyleArray: FashionStyle[] = parsedArray.filter(item => {
    if (!item.hasOwnProperty('id') || typeof item.id !== 'number') {
      return false
    }

    if (
      !item.hasOwnProperty('name') ||
      !FASHION_STYLE_NAMES.includes(item.name)
    ) {
      return false
    }

    return true
  })

  return fashionStyleArray
}

const sanitizedSnsPosts = (
  snsPostsFromStrapi: SnsPostResponseAboutFiltering[]
): SnsPostForMainPage[] => {
  return snsPostsFromStrapi.map(post => ({
    id: post.id,
    createdAt: post.attributes.createdAt,
    author: {
      username: post.attributes.author.data.attributes.username,
      gender: post.attributes.author.data.attributes.gender,
      bodyShape: post.attributes.author.data.attributes.bodyShape,
      fashionStyles: post.attributes.author.data.attributes.fashionStyles,
    },
    postImage: {
      url: post.attributes.postImages.data[0].attributes.url,
      altText: post.attributes.postImages.data[0].attributes.alternativeText,
    },
    likeUsers: post.attributes.likeUsers.data,
  }))
}

type FilterSnsPostsByMyInfoArgs = {
  snsPosts: SnsPostForMainPage[]
  isLoggedIn: boolean
  myGender: Nullable<string>
  myBodyShape: Nullable<string>
  myFashionStyles: Nullable<FashionStyle[]>
}

type FilterSnsPostsByMyInfo = (
  args: FilterSnsPostsByMyInfoArgs
) => SnsPostForMainPage[]

const filterSnsPostsByMyInfo: FilterSnsPostsByMyInfo = ({
  snsPosts,
  isLoggedIn,
  myGender,
  myBodyShape,
  myFashionStyles,
}) => {
  if (!isLoggedIn) {
    return snsPosts
  }

  const filterConditionCount = [myGender, myBodyShape, myFashionStyles]
    .map(Boolean)
    .filter(Boolean).length

  if (filterConditionCount === 0) {
    return snsPosts
  }

  if (filterConditionCount === 1) {
    showMessageAboutAddingAdditionalInfo()
    return snsPosts
  }

  const filteredSnsPosts = snsPosts
    .filter(byMyGender(myGender))
    .filter(byMyBodyShape(myBodyShape))
    .filter(byMyFashionStyles(myFashionStyles))

  return filteredSnsPosts
}

const byMyBodyShape =
  (myBodyShape: Nullable<string>) =>
  (snsPost: SnsPostForMainPage): boolean => {
    if (myBodyShape === null) {
      return true
    }

    return snsPost.author.bodyShape === myBodyShape
  }

const byMyGender =
  (myGender: Nullable<string>) =>
  (snsPost: SnsPostForMainPage): boolean => {
    if (myGender === null) {
      return true
    }

    return snsPost.author.gender === myGender
  }

const byMyFashionStyles =
  (myFashionStyles: Nullable<FashionStyle[]>) =>
  (snsPost: SnsPostForMainPage): boolean => {
    if (myFashionStyles === null) {
      return true
    }

    if (!snsPost.author.fashionStyles) {
      return false
    }

    return snsPost.author.fashionStyles.some(authorFashionStyle =>
      myFashionStyles.some(
        myFashionStyle => authorFashionStyle.id === myFashionStyle.id
      )
    )
  }
