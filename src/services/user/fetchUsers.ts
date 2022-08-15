import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/constants'

const fetchUsers = async (): Promise<AxiosResponse> => {
  return axios({
    method: 'get',
    url: `${BACKEND_URL}/api/users`,
  })
}

export default fetchUsers
