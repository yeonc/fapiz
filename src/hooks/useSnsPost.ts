import useSWR from 'swr'
import { SnsPost } from 'types/snsPost'
import createUrlQuery from 'utils/createUrlQuery'

const defaultQuery = createUrlQuery({ populate: '*' })

const useSnsPost = (postId: number, query = defaultQuery) => {
  const { data, error } = useSWR<{ data: SnsPost }, Error>(
    postId
      ? {
          url: `/api/sns-posts/${postId}?${query}`,
        }
      : null
  )

  return { snsPost: data?.data, isLoading: !data && !error, error }
}

export default useSnsPost
