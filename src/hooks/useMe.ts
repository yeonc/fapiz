import useSWR from 'swr'
import { BACKEND_URL } from 'constants/constants'
import getToken from 'utils/getToken'

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
