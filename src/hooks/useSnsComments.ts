import useSWR from 'swr'
import { PostCommentResponse } from 'types/postComment'

const useSnsComments = (query: string) => {
  const { data, error } = useSWR<{ data: PostCommentResponse[] }, Error>({
    url: `/api/sns-comments?${query}`,
  })
  const snsComments = data ? data.data : []
  return { snsComments, isLoading: !data && !error, error }
}

export default useSnsComments
