import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/constants'

type FollowArgs = {
  myId: number
  targetUserId: number
  myFollowingUserIds: number[]
}
type Follow = (args: FollowArgs) => Promise<AxiosResponse>

const follow: Follow = async ({ myId, targetUserId, myFollowingUserIds }) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/users/${myId}`,
    data: {
      followings: [...myFollowingUserIds, targetUserId],
    },
  })
}

export default follow
