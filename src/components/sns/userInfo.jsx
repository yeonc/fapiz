import { useEffect, useState } from 'react'
import UserProfile from 'components/sns/userProfile'
import UserButtons from 'components/sns/userButtons'
import useGetRequest from 'hooks/useGetRequest'
import { BACKEND_URL, IS_SERVER } from 'constants/constants'

const UserInfo = () => {
  const [user, setUser] = useState()

  const token = !IS_SERVER && localStorage.getItem('jwt')
  const { response } = useGetRequest(BACKEND_URL, '/api/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  useEffect(() => {
    if (response !== null) {
      setUser(response.data)
    }
  }, [response])

  return (
    <header>
      <UserProfile user={user} />
      <UserButtons />
    </header>
  )
}

export default UserInfo
