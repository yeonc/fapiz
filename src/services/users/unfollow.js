import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const unfollow = async ({ myId, targetUserId, myFollowingUserIds }) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/users/${myId}`,
    data: {
      following: null,
    },
  }).then(() => {
    axios({
      method: 'put',
      url: `${BACKEND_URL}/api/users/${myId}`,
      data: {
        following: myFollowingUserIds.filter(id => id !== targetUserId),
      },
    })
  })
}

export default unfollow
