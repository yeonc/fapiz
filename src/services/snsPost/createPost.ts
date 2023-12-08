import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'
import { Id } from 'types/common'
import { FashionItemInfo } from 'types/fashion'

type CreatePostArgs = {
  postText: string
  fashionItemInfos: FashionItemInfo[]
  authorId: Id
  postImageIds: Id[]
}

type CreatePost = (
  args: CreatePostArgs
) => Promise<AxiosResponse<{ data: { id: Id } }>>

const createPost: CreatePost = async ({
  postText,
  fashionItemInfos: fashionItemInfos,
  authorId,
  postImageIds,
}) => {
  return axios({
    method: 'post',
    url: `${BACKEND_URL}/api/sns-posts`,
    data: {
      data: {
        content: postText,
        fashionItemInfos: fashionItemInfos,
        author: authorId,
        postImages: postImageIds,
      },
    },
  })
}

export default createPost
