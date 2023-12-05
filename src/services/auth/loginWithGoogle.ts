import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/constants'
import { AccessToken, LoginSuccessResponseFromStrapi } from 'types/auth'

const loginWithGoogle = async (
  accessToken: AccessToken
): Promise<AxiosResponse<LoginSuccessResponseFromStrapi>> => {
  return axios({
    method: 'get',
    url: `${BACKEND_URL}/api/auth/google/callback`,
    params: { access_token: accessToken },
  })
}

export default loginWithGoogle
