import { useEffect } from 'react'
import { useRouter } from 'next/router'
import ROUTE_URL from 'constants/routeUrl'
import { AccessToken } from 'types/auth'
import { useAuth } from 'context/AuthContext'

const GoogleLoginRedirectPage = () => {
  const router = useRouter()
  const { login } = useAuth()

  useEffect(() => {
    const queryString = location.search
    const accessToken = getAccessTokenFromQueryString(queryString)
    const goToHomePage = () => router.push(ROUTE_URL.HOME)
    login(accessToken) //
      .then(goToHomePage)
      .catch(console.error)
  }, [router, login])

  return null
}

export default GoogleLoginRedirectPage

const getAccessTokenFromQueryString = (queryString: string): AccessToken => {
  const ACCESS_TOKEN_KEY = 'access_token'
  const urlQueryParams = new URLSearchParams(queryString)
  const accessToken = urlQueryParams.get(ACCESS_TOKEN_KEY)
  return accessToken
}
