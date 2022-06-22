import useSWR from 'swr'
import { BACKEND_URL, IS_SERVER } from 'constants/constants'

const token = !IS_SERVER && localStorage.getItem('jwt')

const useMe = () => {
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
    me: data,
    isLoading: !data && !error,
    error,
  }
}

export default useMe
