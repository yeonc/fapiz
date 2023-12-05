import useSWR from 'swr'

const useUser = <T>(userId?: number, query?: string) => {
  const { data, error } = useSWR<T, Error>(
    userId
      ? {
          url: `/api/users/${userId}${query ? `?${query}` : ''}`,
        }
      : null
  )

  if (!userId) {
    return {
      user: null,
      isLoading: false,
      error: null,
    }
  }

  return {
    user: data,
    isLoading: !data && !error,
    error,
  }
}

export default useUser
