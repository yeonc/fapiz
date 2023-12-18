import axios, { AxiosResponse } from 'axios'
import { SnsPostForHomePage } from 'pages/api/filtered-sns-posts'
import { Nullable } from 'types/common'
import { FashionStyle } from 'types/fashion'
import { BodyShape, Gender } from 'types/user'

type FetchFilteredSnsPostsArgs = {
  pageNumber: number
  pageSize: number
  isLoggedIn: boolean
  myGender: Nullable<Gender>
  myBodyShape: Nullable<BodyShape>
  myFashionStyles: Nullable<FashionStyle[]>
}

type FetchFilteredSnsPosts = (
  args: FetchFilteredSnsPostsArgs
) => Promise<AxiosResponse<SnsPostForHomePage[]>>

const fetchFilteredSnsPosts: FetchFilteredSnsPosts = async ({
  pageNumber,
  pageSize,
  isLoggedIn,
  myGender,
  myBodyShape,
  myFashionStyles,
}) => {
  const myFashionStylesString = JSON.stringify(myFashionStyles)
  const encodedMyFashonStyles = encodeURIComponent(myFashionStylesString)

  return axios({
    method: 'get',
    url: '/api/filtered-sns-posts',
    params: {
      pageNumber,
      pageSize,
      isLoggedIn,
      myGender,
      myBodyShape,
      myFashionStyles: encodedMyFashonStyles,
    },
  })
}

export default fetchFilteredSnsPosts
