import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/constants'
import { FashionItemInfo } from 'types/fashion'

type CreatePostArgs = {
  postText?: string
  fashionItemsInfo: FashionItemInfo[] | []
  authorId: number
  postImageIds: number[]
}

type CreatePost = (args: CreatePostArgs) => Promise<AxiosResponse>

const createPost: CreatePost = async ({
  postText,
  fashionItemsInfo,
  authorId,
  postImageIds,
}) => {
  return axios({
    method: 'post',
    url: `${BACKEND_URL}/api/sns-posts`,
    data: {
      data: {
        content: postText,
        fashionItemsInfo,
        author: authorId,
        postImages: postImageIds,
      },
    },
  })
}

export default createPost
