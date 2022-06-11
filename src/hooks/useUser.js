import useSWR from 'swr'
import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const fetcher = ({ baseURL = BACKEND_URL, url, config }) => {
  const axiosConfig = {
    baseURL,
    ...config,
  }

  return axios.get(url, axiosConfig).then(res => res.data)
}

const useUser = id => {
  const { data, error } = useSWR({ url: `/api/users/${id}` }, fetcher)

  return {
    user: data,
    isLoading: !data && !error,
    error,
  }
}

export default useUser
