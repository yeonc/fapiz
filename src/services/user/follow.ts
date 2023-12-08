import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'
import { Id } from 'types/common'

type FollowArgs = {
  myId: Id
  targetUserId: Id
  targetUserFollowerIds: Id[]
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
