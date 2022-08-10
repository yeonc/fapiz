import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/constants'
import { FashionItemInfo } from 'types/fashion'

type EditPostArgs = {
  postId: number
  content: string
  imageIds?: number[]
  fashionItemsInfo: FashionItemInfo[]
}

type EditPost = (args: EditPostArgs) => Promise<AxiosResponse>

const editPost: EditPost = async ({
  postId,
  content,
  imageIds,
  fashionItemsInfo,
}) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/sns-posts/${postId}`,
    data: {
      data: {
        content,
        postImages: imageIds,
        fashionItemsInfo,
      },
    },
  })
}

export default editPost
