import { useEffect } from 'react'
import { useRouter } from 'next/router'

const PreviousPageRedirect = ({ alertMessage }) => {
  const router = useRouter()
  const goToPreviousPage = () => router.back()

  useEffect(() => {
    alert(alertMessage)
    goToPreviousPage()
  }, [])

  return null
}

export default PreviousPageRedirect
