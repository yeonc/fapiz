import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/constants'

type unfollowArgs = {
  myId: number
  targetUserId: number
  targetUserFollowerIds: number[]
}
type Unfollow = (args: unfollowArgs) => Promise<AxiosResponse>

const unfollow: Unfollow = async ({
  myId,
  targetUserId,
  targetUserFollowerIds,
}) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/users/${targetUserId}`,
    data: {
      followers: targetUserFollowerIds.filter(id => id !== myId),
    },
  })
}

export default unfollow
