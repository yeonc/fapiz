import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/constants'

const deleteComment = async (commentId: number): Promise<AxiosResponse> => {
  return axios({
    method: 'delete',
    url: `${BACKEND_URL}/api/sns-comments/${commentId}`,
  })
}

export default deleteComment
