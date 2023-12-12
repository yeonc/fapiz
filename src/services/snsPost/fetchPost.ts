import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'
import { Id } from 'types/common'
import { SnsPostResponseAboutPostDetail } from 'types/snsPost'

const fetchPost = async (
  id: Id
): Promise<AxiosResponse<SnsPostResponseAboutPostDetail>> => {
  return axios({
    method: 'get',
    url: `${BACKEND_URL}/api/sns-posts/${id}`,
    params: {
      'populate[0]': 'author.profileImage',
      'populate[1]': 'likeUsers',
      'populate[2]': 'bookmarkUsers',
      'populate[3]': 'postImages',
    },
  })
}

export default fetchPost
