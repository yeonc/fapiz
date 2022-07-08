import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/constants'
import { FashionItemInfo } from 'types'

type EditPostProps = {
  postId: number
  content?: string
  imageIds?: number[]
  fashionItemsInfo?: FashionItemInfo[]
}

const editPost = async ({
  postId,
  content,
  imageIds,
  fashionItemsInfo,
}: EditPostProps): Promise<AxiosResponse> => {
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
