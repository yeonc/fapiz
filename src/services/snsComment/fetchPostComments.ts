import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'
import { Id } from 'types/common'
import { PostCommentResponse } from 'types/postComment'

const fetchPostComments = async (
  postId: Id
): Promise<AxiosResponse<PostCommentResponse[]>> => {
  return axios({
    method: 'get',
    url: `${BACKEND_URL}/api/sns-comments`,
    params: {
      'populate[0]': 'author',
      'populate[1]': 'author.profileImage',
      'filters[post][id][$eq]': `${postId}`,
      sort: 'createdAt:desc',
    },
  })
}

export default fetchPostComments
