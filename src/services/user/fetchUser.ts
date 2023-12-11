import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'
import { Id } from 'types/common'
import { UserResponseWithAdditionalFields } from 'types/user'

const fetchUser = async (
  id: Id
): Promise<AxiosResponse<UserResponseWithAdditionalFields>> => {
  return axios({
    method: 'get',
    url: `${BACKEND_URL}/api/users/${id}`,
    params: {
      'populate[0]': 'profileImage',
      'populate[1]': 'followers.profileImage',
      'populate[2]': 'followings.profileImage',
      'populate[3]': 'followers.followers',
      'populate[4]': 'followings.followers',
    },
  })
}

export default fetchUser
