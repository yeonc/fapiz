import React, { useEffect } from 'react'
import ROUTE_URL from '../../../constants/routeUrl'
import GoogleAuthProvider from '../../../services/auth/google'

const GoogleAuth = new GoogleAuthProvider()

const googleLoginRedirect = () => {
  let accessToken
  if (typeof window !== 'undefined') {
    function searchParam(key) {
      const URLSearch = new URLSearchParams(location.search)
      const accessTokenValue = URLSearch.get(key)
      return accessTokenValue
    }
    accessToken = searchParam('access_token')
  }

  useEffect(() => {
    GoogleAuth.login(accessToken)
      .then(response => {
        localStorage.setItem('jwt', response.jwt)
        localStorage.setItem('username', response.user.username)
        setTimeout(() => router.push(ROUTE_URL.HOME), 3000)
      })
      .catch(console.log)
  }, [])

  return <h1>googleLoginRedirect</h1>
}

export default googleLoginRedirect
