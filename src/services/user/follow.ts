import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const follow = async ({ myId, targetUserId, myFollowingUserIds }) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/users/${myId}`,
    data: {
      followings: [...myFollowingUserIds, targetUserId],
    },
  })
}

export default follow
