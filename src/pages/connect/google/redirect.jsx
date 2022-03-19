import React, { useEffect } from 'react'
import ROUTE_URL from '../../../constants/routeUrl'
import GoogleAuth from '../../../services/auth/google'
import { useRouter } from 'next/router'
import { IS_SERVER } from '../../../constants/constants'

const GoogleLoginRedirectPage = () => {
  const router = useRouter()

  let accessToken
  if (!IS_SERVER) {
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
        const data = response.data
        localStorage.setItem('jwt', data.jwt)
        localStorage.setItem('username', data.user.username)
        router.push(ROUTE_URL.HOME)
      })
      .catch(console.error)
  }, [])

  return <p>로그인 중입니다. 잠시만 기다려 주세요</p>
}

export default GoogleLoginRedirectPage
