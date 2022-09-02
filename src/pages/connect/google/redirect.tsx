import { useEffect } from 'react'
import { useRouter } from 'next/router'
import googleLogin from 'services/auth/googleLogin'
import getValueOfKeyFromQueryString from 'utils/getValueOfKeyFromQueryString'
import ROUTE_URL from 'constants/routeUrl'
import { LoginSuccessResponseData, AccessToken } from 'types/auth'

const ACCESS_TOKEN_KEY = 'access_token'

const getAccessTokenFromQueryString = (queryString: string): AccessToken => {
  const accessToken = getValueOfKeyFromQueryString({
    queryString,
    key: ACCESS_TOKEN_KEY,
  })
  return accessToken
}

const setUserDataToLocalStorage = (data: LoginSuccessResponseData) => {
  localStorage.setItem('jwt', data.jwt)
  localStorage.setItem('username', data.user.username)
}

const login = async (accessToken: AccessToken) => {
  try {
    const res = await googleLogin(accessToken)
    setUserDataToLocalStorage(res.data)
  } catch (error) {
    console.error(error)
  }
}

const GoogleLoginRedirectPage = () => {
  const router = useRouter()

  const afterLogin = () => {
    router.push(ROUTE_URL.HOME)
  }

  useEffect(() => {
    const queryString = location.search
    const accessToken = getAccessTokenFromQueryString(queryString)
    login(accessToken)
      .then(() => afterLogin())
      .catch(console.error)
  }, [])

  return null
}

export default GoogleLoginRedirectPage
