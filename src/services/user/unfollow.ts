import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'
import { Id } from 'types/common'

type unfollowArgs = {
  myId: Id
  targetUserId: Id
  targetUserFollowerIds: Id[]
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
