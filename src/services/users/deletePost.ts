import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const deletePost = async (postId: any) => {
  return axios({
    method: 'delete',
    url: `${BACKEND_URL}/api/sns-posts/${postId}`,
  })
}

export default deletePost
