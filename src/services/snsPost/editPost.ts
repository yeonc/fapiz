import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'
import { Nullable } from 'types/common'
import { FashionItemInfo } from 'types/fashion'

type EditPostArgs = {
  postId: number
  content: Nullable<string>
  imageIds?: number[]
  fashionItemInfos: FashionItemInfo[]
}

type EditPost = (args: EditPostArgs) => Promise<AxiosResponse>

const editPost: EditPost = async ({
  postId,
  content,
  imageIds,
  fashionItemInfos: fashionItemInfos,
}) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/sns-posts/${postId}`,
    data: {
      data: {
        content: content === '' ? null : content,
        postImages: imageIds,
        fashionItemInfos:
          fashionItemInfos.length === 0 ? null : fashionItemInfos,
      },
    },
  })
}

export default editPost
