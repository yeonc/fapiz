import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/constants'

type CreateCommentArgs = {
  comment: string
  postId: number
  authorId: number
}

type CreateComment = (args: CreateCommentArgs) => Promise<AxiosResponse>

const createComment: CreateComment = async ({ comment, postId, authorId }) => {
  return axios({
    method: 'post',
    url: `${BACKEND_URL}/api/sns-comments`,
    data: {
      data: {
        content: comment,
        post: postId,
        author: authorId,
      },
    },
  })
}

export default createComment
