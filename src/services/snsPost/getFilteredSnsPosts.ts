import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'
import { SnsPostForHomePage } from 'pages/api/filtered-sns-posts'
import { sanitizeSnsPostsForHomePage } from 'sanitizer/snsPosts'
import { Nullable } from 'types/common'
import { FashionStyle } from 'types/fashion'
import { SnsPostResponseAboutFiltering } from 'types/snsPost'
import { BodyShape, Gender } from 'types/user'

type FilterSnsPostArgs = {
  isLoggedIn: boolean
  myGender: Nullable<Gender>
  myBodyShape: Nullable<BodyShape>
  myFashionStyles: Nullable<FashionStyle[]>
}

const getFilteredSnsPosts = async ({
  isLoggedIn,
  myGender,
  myBodyShape,
  myFashionStyles,
}: FilterSnsPostArgs): Promise<SnsPostForHomePage[]> => {
  const response = await fetchSnsPosts()
  const snsPostsFromStrapi = response.data.data

  const snsPosts = sanitizeSnsPostsForHomePage(snsPostsFromStrapi)

  const filteredSnsPostsByMyInfo = filterSnsPostsByMyInfo({
    snsPosts,
    isLoggedIn,
    myGender,
    myBodyShape,
    myFashionStyles,
  })

  return filteredSnsPostsByMyInfo
}

export default getFilteredSnsPosts

const fetchSnsPosts = async (): Promise<
  AxiosResponse<{ data: SnsPostResponseAboutFiltering[] }>
> => {
  return axios({
    method: 'get',
    url: `${BACKEND_URL}/api/sns-posts`,
    params: {
      'populate[0]': 'postImages',
      'populate[1]': 'likeUsers',
      'populate[2]': 'author',
      sort: 'createdAt:desc',
    },
  })
}

type FilterSnsPostsByMyInfoArgs = {
  snsPosts: SnsPostForHomePage[]
  isLoggedIn: boolean
  myGender: Nullable<Gender>
  myBodyShape: Nullable<BodyShape>
  myFashionStyles: Nullable<FashionStyle[]>
}

type FilterSnsPostsByMyInfo = (
  args: FilterSnsPostsByMyInfoArgs
) => SnsPostForHomePage[]

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
    return snsPosts
  }

  const filteredSnsPosts = snsPosts
    .filter(byMyGender(myGender))
    .filter(byMyBodyShape(myBodyShape))
    .filter(byMyFashionStyles(myFashionStyles))

  return filteredSnsPosts
}

const byMyBodyShape =
  (myBodyShape: Nullable<BodyShape>) =>
  (snsPost: SnsPostForHomePage): boolean => {
    if (myBodyShape === null) {
      return true
    }

    return snsPost.author.bodyShape === myBodyShape
  }

const byMyGender =
  (myGender: Nullable<Gender>) =>
  (snsPost: SnsPostForHomePage): boolean => {
    if (myGender === null) {
      return true
    }

    return snsPost.author.gender === myGender
  }

const byMyFashionStyles =
  (myFashionStyles: Nullable<FashionStyle[]>) =>
  (snsPost: SnsPostForHomePage): boolean => {
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
