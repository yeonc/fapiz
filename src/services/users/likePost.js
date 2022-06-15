import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const likePost = async ({ snsPostId, likeUserId }) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/sns-posts/${snsPostId}`,
    data: {
      likeUsers: likeUserId,
    },
  })
}

export default likePost
