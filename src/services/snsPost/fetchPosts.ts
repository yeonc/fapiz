import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'
import { Id } from 'types/common'
import { SnsPostResponseAboutShowingAll } from 'types/snsPost'

const fetchPosts = async (
  authorId: Id
): Promise<AxiosResponse<SnsPostResponseAboutShowingAll[]>> => {
  return axios({
    method: 'get',
    url: `${BACKEND_URL}/api/sns-posts`,
    params: {
      populate: '*',
      'filters[author][id][$eq]': authorId,
      sort: 'createdAt:desc',
    },
  })
}

export default fetchPosts
