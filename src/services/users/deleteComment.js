import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const deleteComment = async commentId => {
  return axios({
    method: 'delete',
    url: `${BACKEND_URL}/api/sns-comments/${commentId}`,
  })
}

export default deleteComment
