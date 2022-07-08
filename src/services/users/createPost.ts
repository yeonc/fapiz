import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/constants'
import { FashionItemInfo } from 'types'

type CreatePostProps = {
  postText?: string
  fashionItemsInfo: FashionItemInfo[] | []
  authorId: number
  postImageIds: number[]
}

const createPost = async ({
  postText,
  fashionItemsInfo,
  authorId,
  postImageIds,
}: CreatePostProps): Promise<AxiosResponse> => {
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
