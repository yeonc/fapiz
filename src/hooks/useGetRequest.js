import { useState, useEffect } from 'react'
import axios from 'axios'

const useGetRequest = (baseURL, url, config) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [url])

  const axiosConfig = {
    baseURL,
    ...config,
  }

  const fetchData = () => {
    setLoading(true)
    axios
      .get(url, axiosConfig)
      .then(res => setResponse(res))
      .then(() => setError(null))
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  }

  return { response, error, loading }
}

export default useGetRequest
