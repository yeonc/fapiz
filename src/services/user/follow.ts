import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'

type FollowArgs = {
  myId: number
  targetUserId: number
  targetUserFollowerIds: number[]
}
type Follow = (args: FollowArgs) => Promise<AxiosResponse>

const follow: Follow = async ({
  myId,
  targetUserId,
  targetUserFollowerIds,
}) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/users/${targetUserId}`,
    data: {
      followers: [...targetUserFollowerIds, myId],
    },
  })
}

export default follow
