import useGetRequest from 'hooks/useGetRequest'
import createUrlQuery from 'utils/createUrlQuery'

const useFetchSnsPosts = userId => {
  const query = createUrlQuery({
    populate: '*',
    'filters[author][id][$eq]': userId,
  })

  const { response, error, loading } = useGetRequest({
    url: `/api/sns-posts?${query}`,
  })

  const snsPosts = response?.data

  return { snsPosts, error, loading }
}

export default useFetchSnsPosts
