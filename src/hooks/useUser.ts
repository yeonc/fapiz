import useSWR from 'swr'

const useUser = (userId: any) => {
  const { data, error } = useSWR(
    userId ? { url: `/api/users/${userId}` } : null
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
