import useSWR from 'swr'

const useUser = (userId: number, query?: string) => {
  const urlNotIncludedQuery = `/api/users/${userId}`
  const urlIncludedQuery = `/api/users/${userId}?${query}`
  const url = query ? urlIncludedQuery : urlNotIncludedQuery

  const { data, error } = useSWR(userId ? { url } : null)

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
