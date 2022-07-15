import useSWR from 'swr'

const useUser = (userId: any) => {
  const { data, error } = useSWR(
    userId ? { url: `/api/users/${userId}` } : null
  )

  return {
    user: data,
    isLoading: !data && !error,
    error,
  }
}

export default useUser
