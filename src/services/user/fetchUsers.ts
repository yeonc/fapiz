import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/constants'
import { UserResponseWithProfileImage } from 'types/user'

const fetchUsers = async (): Promise<
  AxiosResponse<UserResponseWithProfileImage[]>
> => {
  return axios({
    method: 'get',
    url: `${BACKEND_URL}/api/users`,
    params: {
      'populate[0]': 'profileImage',
    },
  })
}

export default fetchUsers
