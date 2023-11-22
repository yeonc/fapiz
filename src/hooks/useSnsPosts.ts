import useSWR from 'swr'

const useSnsPosts = <T>(query: string) => {
  const { data, error } = useSWR<{ data: T }, Error>({
    url: `/api/sns-posts?${query}`,
  })

  return {
    snsPosts: data?.data,
    isLoading: !data && !error,
    error,
  }
}

export default useSnsPosts
