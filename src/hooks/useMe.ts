import useSWR from 'swr'
import getToken from 'utils/getToken'

const useMe = <T>(query?: string) => {
  const token = getToken()
  const { data, error } = useSWR<T, Error>(
    token
      ? {
          url: `/api/users/me${query ? `?${query}` : ''}`,
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
