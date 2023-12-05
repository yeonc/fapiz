import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/constants'
import { User } from 'types/user'

const fetchMe = async (token: string): Promise<AxiosResponse<User>> => {
  return axios({
    method: 'get',
    url: `${BACKEND_URL}/api/users/me`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export default fetchMe
