import useSWR from 'swr'
import { BACKEND_URL } from 'constants/constants'
import getToken from 'utils/getToken'

const useMe = (query?: string) => {
  const token = getToken()

  const urlNotIncludedQuery = `${BACKEND_URL}/api/users/me`
  const urlIncludedQuery = `${BACKEND_URL}/api/users/me?${query}`
  const url = query ? urlIncludedQuery : urlNotIncludedQuery

  const { data, error } = useSWR(
    token
      ? {
          url,
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
