import { useEffect } from 'react'
import { useRouter } from 'next/router'
import googleLogin from 'services/auth/googleLogin'
import ROUTE_URL from 'constants/routeUrl'
import { LoginSuccessResponse, AccessToken } from 'types/auth'

const GoogleLoginRedirectPage = () => {
  const router = useRouter()
  const goToHomePage = () => router.push(ROUTE_URL.HOME)

  useEffect(() => {
    const queryString = location.search
    const accessToken = getAccessTokenFromQueryString(queryString)
    login(accessToken) //
      .then(goToHomePage)
      .catch(console.error)
  }, [])

  return null
}

export default GoogleLoginRedirectPage

const getAccessTokenFromQueryString = (queryString: string): AccessToken => {
  const ACCESS_TOKEN_KEY = 'access_token'
  const urlQueryParams = new URLSearchParams(queryString)
  const accessToken = urlQueryParams.get(ACCESS_TOKEN_KEY)
  return accessToken
}

const login = async (accessToken: AccessToken) => {
  const res = await googleLogin(accessToken)
  setUserDataToLocalStorage(res.data)
}

const setUserDataToLocalStorage = (data: LoginSuccessResponse) => {
  localStorage.setItem('jwt', data.jwt)
  localStorage.setItem('username', data.user.username)
}
