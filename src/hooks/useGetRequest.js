import { useState, useEffect } from 'react'
import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const useGetRequest = ({ baseURL = BACKEND_URL, url, config, skip }) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (skip) {
      return
    }

    fetchData().then(handleSuccess).catch(handleFailure)
  }, [url, skip])

  const fetchData = async () => {
    const axiosConfig = {
      baseURL,
      ...config,
    }

    const data = await axios.get(url, axiosConfig)
    return data
  }

  const handleSuccess = res => {
    setResponse(res)
    setError(null)
  }

  const handleFailure = error => {
    setError(error)
    setResponse(null)
  }

  const loading = !response && !error

  return { response, error, loading }
}

export default useGetRequest
