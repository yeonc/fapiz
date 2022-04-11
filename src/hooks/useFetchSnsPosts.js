import useGetRequest from 'hooks/useGetRequest'
import { BACKEND_URL } from 'constants/constants'
import createUrlQuery from 'utils/createUrlQuery'

const useFetchSnsPosts = userId => {
  const query = createUrlQuery({
    populate: '*',
    'filters[author][id][$eq]': userId,
  })

  const URL_FOR_FETCHING_SNS_POSTS = `/api/sns-posts?${query}`
  const { response, error, loading } = useGetRequest(
    BACKEND_URL,
    URL_FOR_FETCHING_SNS_POSTS
  )

  const snsPosts = response?.data

  return { snsPosts, error, loading }
}

export default useFetchSnsPosts
