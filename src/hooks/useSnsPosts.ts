import useSWR from 'swr'
import { SnsPost } from 'types/snsPost'

const useSnsPosts = (query: string) => {
  const { data, error } = useSWR<{ data: SnsPost[] }, Error>({
    url: `/api/sns-posts?${query}`,
  })

  return {
    snsPosts: data?.data,
    isLoading: !data && !error,
    error,
  }
}

export default useSnsPosts
