import useGetRequest from 'hooks/useGetRequest'
import { IS_SERVER } from 'constants/constants'

const useFetchUser = () => {
  const token = !IS_SERVER && localStorage.getItem('jwt')

  const { response, error, loading } = useGetRequest({
    url: '/api/users/me',
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    skip: !token,
  })

  const user = response?.data

  return { user, error, loading }
}

export default useFetchUser
