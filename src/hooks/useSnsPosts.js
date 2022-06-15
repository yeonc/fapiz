import useSWR from 'swr'
import createUrlQuery from 'utils/createUrlQuery'

const useSnsPosts = userId => {
  const query = createUrlQuery({
    populate: '*',
    'filters[author][id][$eq]': userId,
  })

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
