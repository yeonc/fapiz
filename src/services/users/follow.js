import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const follow = async ({ myId, targetUserId }) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/users/${myId}`,
    data: {
      following: [targetUserId],
    },
  })
}

export default follow
