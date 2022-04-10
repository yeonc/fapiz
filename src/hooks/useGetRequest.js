import { useState, useEffect } from 'react'
import axios from 'axios'

const useGetRequest = (baseURL, url, config) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState()

  useEffect(() => {
    fetchData()
  }, [url])

  const axiosConfig = {
    baseURL,
    ...config,
  }

  const fetchData = () => {
    axios
      .get(url, axiosConfig)
      .then(res => setResponse(res))
      .then(() => setError(null))
      .catch(error => setError(error))
  }

  const loading = !response && !error

  return { response, error, loading }
}

export default useGetRequest
