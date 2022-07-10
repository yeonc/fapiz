import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'
import { AccessToken } from 'types/auth'

class GoogleAuthProvider {
  // TODO: login response 타입 정의
  static login(accessToken: AccessToken) {
    const response = axios.get(`${BACKEND_URL}/api/auth/google/callback`, {
      params: { access_token: accessToken },
    })
    return response
  }
}

export default GoogleAuthProvider
