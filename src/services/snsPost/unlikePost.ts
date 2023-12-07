import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'

type UnlikePostArgs = {
  targetPostId: number
  myId: number
  likeUserIds: number[]
}

type UnlikePost = (args: UnlikePostArgs) => Promise<AxiosResponse>

const unlikePost: UnlikePost = async ({ targetPostId, myId, likeUserIds }) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/sns-posts/${targetPostId}`,
    data: {
      data: {
        likeUsers: likeUserIds.filter(userId => userId !== myId),
      },
    },
  })
}

export default unlikePost
