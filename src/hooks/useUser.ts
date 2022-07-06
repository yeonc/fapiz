import useSWR from 'swr'

const useUser = (id: any) => {
  const { data, error } = useSWR({ url: `/api/users/${id}` })

  return {
    user: data,
    isLoading: !data && !error,
    error,
  }
}

export default useUser
