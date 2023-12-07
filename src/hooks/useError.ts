import { useState } from 'react'
import { Nullable } from 'types/common'

const useError = <T>() => {
  const [error, setError] = useState<Nullable<T>>(null)
  const handleError = (errorType: T, errorTimeoutSec: number) => {
    setError(errorType)
    setTimeout(() => setError(null), errorTimeoutSec * 1000)
  }
  return { error, handleError }
}

export default useError
