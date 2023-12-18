import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'
import { Id } from 'types/common'

type UnlikePostArgs = {
  targetPostId: Id
  myId: Id
  likeUserIds: Id[]
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
