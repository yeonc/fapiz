import axios, { AxiosRequestConfig } from 'axios'
import { BACKEND_URL } from 'constants/constants'

type SwrFetcherArgs = {
  baseURL?: string
  url: string
  config: Omit<AxiosRequestConfig, 'baseURL'>
}

const swrFetcher = ({ baseURL = BACKEND_URL, url, config }: SwrFetcherArgs) => {
  const axiosConfig = {
    baseURL,
    ...config,
  }

  return axios.get(url, axiosConfig).then(res => res.data)
}

export default swrFetcher
