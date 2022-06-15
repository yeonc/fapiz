import useSWR from 'swr'
import createUrlQuery from 'utils/createUrlQuery'

const defaultQuery = createUrlQuery({ populate: '*' })

const useSnsPost = (postId, query = defaultQuery) => {
  const { data, error } = useSWR({ url: `api/sns-posts/${postId}?${query}` })

  return { snsPost: data?.data, isLoading: !data && !error, error }
}
export default useSnsPost
