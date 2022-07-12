import useSWR from 'swr'

const useSnsPosts = query => {
  const { data, error } = useSWR({
    url: `/api/sns-posts?${query}`,
  })

  return {
    snsPosts: data?.data,
    isLoading: !data && !error,
    error,
  }
}

export default useSnsPosts
