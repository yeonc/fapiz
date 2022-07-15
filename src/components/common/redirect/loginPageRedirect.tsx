import { useEffect } from 'react'
import { useRouter } from 'next/router'
import ROUTE_URL from 'constants/routeUrl'

const LoginPageRedirect = () => {
  const router = useRouter()
  const goToLoginPage = () => router.push(ROUTE_URL.LOGIN)

  useEffect(() => {
    goToLoginPage()
  }, [])

  return null
}

export default LoginPageRedirect
