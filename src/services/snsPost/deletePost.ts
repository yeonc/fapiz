import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'

const deletePost = async (postId: number): Promise<AxiosResponse> => {
  return axios({
    method: 'delete',
    url: `${BACKEND_URL}/api/sns-posts/${postId}`,
  })
}

export default deletePost
