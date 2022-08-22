import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/constants'

type LikePostArgs = {
  snsPostId: number
  likeUsersAfterLiked: number[]
}

type LikePost = (args: LikePostArgs) => Promise<AxiosResponse>

const likePost: LikePost = async ({ snsPostId, likeUsersAfterLiked }) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/sns-posts/${snsPostId}`,
    data: {
      data: {
        likeUsers: likeUsersAfterLiked,
      },
    },
  })
}

export default likePost
