import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'
import { Id } from 'types/common'

type CreateCommentArgs = {
  comment: string
  postId: Id
  authorId: Id
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
