import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/constants'
import { SnsPostResponseAboutFiltering } from 'types/snsPost'

const fetchSnsPosts = async (): Promise<
  AxiosResponse<{ data: SnsPostResponseAboutFiltering[] }>
> => {
  return axios({
    method: 'get',
    url: `${BACKEND_URL}/api/sns-posts`,
    params: {
      'populate[0]': 'postImages',
      'populate[1]': 'likeUsers',
      'populate[2]': 'author',
      sort: 'createdAt:desc',
    },
  })
}

export default fetchSnsPosts
