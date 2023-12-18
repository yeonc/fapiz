import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'
import { Id } from 'types/common'

const deletePost = async (postId: Id): Promise<AxiosResponse> => {
  return axios({
    method: 'delete',
    url: `${BACKEND_URL}/api/sns-posts/${postId}`,
  })
}

export default deletePost
