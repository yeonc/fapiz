import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'
import { Id } from 'types/common'

const deleteComment = async (commentId: Id): Promise<AxiosResponse> => {
  return axios({
    method: 'delete',
    url: `${BACKEND_URL}/api/sns-comments/${commentId}`,
  })
}

export default deleteComment
