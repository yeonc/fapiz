import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const createComment = async ({ comment, postId, authorId }) => {
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
