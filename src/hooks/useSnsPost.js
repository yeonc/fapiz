import useSWR from 'swr'
import createUrlQuery from 'utils/createUrlQuery'

const defaultQuery = createUrlQuery({ populate: '*' })

const useSnsPost = (postId, query = defaultQuery) => {
  const { data, error } = useSWR(
    postId
      ? {
          url: `/api/sns-posts/${postId}?${query}`,
        }
      : null
  )

  return { snsPost: data?.data, isLoading: !data && !error, error }
}
export default useSnsPost
