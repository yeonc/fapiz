import { useState, useEffect } from 'react'
import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

axios.defaults.baseURL = BACKEND_URL

const useAxios = (url, method, config) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [url, method])

  const fetchData = () => {
    setLoading(true)
    axios[method](url, config)
      .then(res => setResponse(res.data))
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  }

  return { response, error, loading }
}

export default useAxios
