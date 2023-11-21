import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/constants'
import { User } from 'types/user'

const fetchUsers = async (query?: string): Promise<AxiosResponse<User[]>> => {
  return axios({
    method: 'get',
    url: `${BACKEND_URL}/api/users${query ? `?${query}` : ''}`,
  })
}

export default fetchUsers
