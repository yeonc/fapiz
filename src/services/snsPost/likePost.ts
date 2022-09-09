import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/constants'

type LikePostArgs = {
  targetPostId: number
  myId: number
  likeUserIds: number[]
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
