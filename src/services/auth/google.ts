import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

class GoogleAuthProvider {
  static login(accessToken: any) {
    const response = axios.get(`${BACKEND_URL}/api/auth/google/callback`, {
      params: { access_token: accessToken },
    })
    return response
  }
}

export default GoogleAuthProvider
