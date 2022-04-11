import useGetRequest from 'hooks/useGetRequest'
import { BACKEND_URL, IS_SERVER } from 'constants/constants'

const useFetchUser = () => {
  const token = !IS_SERVER && localStorage.getItem('jwt')

  const { response, error, loading } = useGetRequest(
    BACKEND_URL,
    '/api/users/me',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const user = response?.data

  return { user, error, loading }
}

export default useFetchUser
