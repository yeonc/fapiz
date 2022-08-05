import useSWR from 'swr'
import { BACKEND_URL, IS_SERVER } from 'constants/constants'

type JwtToken = string | null

const getToken = (): JwtToken => {
  const token = !IS_SERVER ? localStorage.getItem('jwt') : null
  return token
}

const useMe = () => {
  const token = getToken()

  const { data, error } = useSWR(
    token
      ? {
          url: `${BACKEND_URL}/api/users/me`,
          config: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        }
      : null
  )

  return {
    me: data ?? null,
    isLoading: token && !error && !data,
    error: error ?? null,
  }
}

export default useMe
