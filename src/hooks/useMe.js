import useSWR from 'swr'
import axios from 'axios'
import { BACKEND_URL, IS_SERVER } from 'constants/constants'

const token = !IS_SERVER && localStorage.getItem('jwt')

const fetcher = ({ baseURL = BACKEND_URL, url, config, skip }) => {
  const axiosConfig = {
    baseURL,
    ...config,
  }

  if (skip) {
    return
  }

  return axios.get(url, axiosConfig).then(res => res.data)
}

const useMe = () => {
  const { data, error } = useSWR(
    {
      url: `/api/users/me`,
      config: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      skip: !token,
    },
    fetcher
  )

  return {
    me: data,
    isLoading: !data && !error,
    error,
  }
}

export default useMe
