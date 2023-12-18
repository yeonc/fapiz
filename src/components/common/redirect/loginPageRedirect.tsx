import { useEffect } from 'react'
import { useRouter } from 'next/router'
import ROUTE_URL from 'constants/routeUrl'

const LoginPageRedirect = () => {
  const router = useRouter()

  useEffect(() => {
    const goToLoginPage = () => router.push(ROUTE_URL.LOGIN)
    goToLoginPage()
  }, [router])

  return null
}

export default LoginPageRedirect
