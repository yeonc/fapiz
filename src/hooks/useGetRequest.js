import { useState, useEffect } from 'react'
import axios from 'axios'

const useGetRequest = (baseURL, url, config) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setStates()
  }, [url])

  const fetchData = async () => {
    const axiosConfig = {
      baseURL,
      ...config,
    }

    const data = await axios.get(url, axiosConfig)
    return data
  }

  const setStates = async () => {
    try {
      const res = await fetchData()
      setResponse(res)
      setError(null)
    } catch (error) {
      setError(error)
      setResponse(null)
    }
  }

  const loading = !response && !error

  return { response, error, loading }
}

export default useGetRequest
