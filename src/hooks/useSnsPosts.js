import useSWR from 'swr'
import axios from 'axios'
import createUrlQuery from 'utils/createUrlQuery'
import { BACKEND_URL } from 'constants/constants'

const fetcher = ({ baseURL = BACKEND_URL, url, config }) => {
  const axiosConfig = {
    baseURL,
    ...config,
  }

  return axios.get(url, axiosConfig).then(res => res.data)
}

const useSnsPosts = userId => {
  const query = createUrlQuery({
    populate: '*',
    'filters[author][id][$eq]': userId,
  })

  const { data, error } = useSWR(
    {
      url: `/api/sns-posts?${query}`,
    },
    fetcher
  )

  return {
    snsPosts: data,
    isLoading: !data && !error,
    isError: error,
  }
}

export default useSnsPosts
