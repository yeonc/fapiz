import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/constants'

type EditCommentArgs = {
  commentId: number
  commentText: string
}

type EditComment = (args: EditCommentArgs) => Promise<AxiosResponse>

const editComment: EditComment = async ({ commentId, commentText }) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/sns-comments/${commentId}`,
    data: {
      data: {
        content: commentText,
      },
    },
  })
}

export default editComment
