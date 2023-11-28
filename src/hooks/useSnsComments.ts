import useSWR from 'swr'
import { PostCommentResponse } from 'types/postComment'

const useSnsComments = (query: string) => {
  const { data, error } = useSWR<{ data: PostCommentResponse[] }, Error>({
    url: `/api/sns-comments?${query}`,
  })

  return {
    snsComments: data?.data,
    isLoading: !data && !error,
    error,
  }
}

export default useSnsComments
