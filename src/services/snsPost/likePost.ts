import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'
import { Id } from 'types/common'

type LikePostArgs = {
  targetPostId: Id
  myId: Id
  likeUserIds: Id[]
}

type LikePost = (args: LikePostArgs) => Promise<AxiosResponse>

const likePost: LikePost = async ({ targetPostId, myId, likeUserIds }) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/sns-posts/${targetPostId}`,
    data: {
      data: {
        likeUsers: [...likeUserIds, myId],
      },
    },
  })
}

export default likePost
