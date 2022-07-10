import { useEffect } from 'react'
import { useRouter } from 'next/router'
import GoogleAuth from 'services/auth/google'
import ROUTE_URL from 'constants/routeUrl'
import { IS_SERVER } from 'constants/constants'
import { Nullable } from 'types'
import { LoginSuccessResponseData, AccessToken } from 'types/auth'

type Value = Nullable<string>

const GoogleLoginRedirectPage = () => {
  const router = useRouter()

  const afterLogin = () => {
    router.push(ROUTE_URL.HOME)
  }

  const setUserDataToLocalStorage = (data: LoginSuccessResponseData) => {
    localStorage.setItem('jwt', data.jwt)
    localStorage.setItem('username', data.user.username)
  }

  let accessToken: AccessToken
  if (!IS_SERVER) {
    const searchParam = (key: string): Value => {
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
        setUserDataToLocalStorage(data)
        afterLogin()
      })
      .catch(console.error)
  }, [])

  return <p>로그인 중입니다. 잠시만 기다려 주세요</p>
}

export default GoogleLoginRedirectPage
