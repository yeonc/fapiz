import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/constants'

type unfollowArgs = {
  myId: number
  targetUserId: number
  myFollowingUserIds: number[]
}
type Unfollow = (args: unfollowArgs) => Promise<AxiosResponse>

const unfollow: Unfollow = async ({
  myId,
  targetUserId,
  myFollowingUserIds,
}) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/users/${myId}`,
    data: {
      followings: myFollowingUserIds.filter(id => id !== targetUserId),
    },
  })
}

export default unfollow
