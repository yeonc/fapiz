import { ErrorType } from 'components/common/texts/ErrorMessage'
import { useState } from 'react'
import { Nullable } from 'types/common'

const useError = () => {
  const [error, setError] = useState<Nullable<ErrorType>>(null)
  const handleError = (
    errorType: ErrorType,
    errorMessageTimeoutSec: number
  ) => {
    setError(errorType)
    setTimeout(() => setError(null), errorMessageTimeoutSec * 1000)
  }
  return { error, handleError }
}

export default useError
