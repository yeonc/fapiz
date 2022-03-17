import axios from 'axios'

class GoogleAuthProvider {
  constructor() {
    this.BACKEND_URL = process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL
  }

  login(accessToken) {
    const response = axios.get(`${this.BACKEND_URL}/auth/google/callback`, {
      params: { access_token: accessToken },
    })
    return response
  }
}

export default GoogleAuthProvider
