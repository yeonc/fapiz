import { useEffect, useState } from 'react'
import UserProfile from 'components/sns/userProfile'
import UserButtons from 'components/sns/userButtons'
import useAxios from 'hooks/useAxios'
import { IS_SERVER } from 'constants/constants'

const UserInfo = () => {
  const [user, setUser] = useState()

  const token = !IS_SERVER && localStorage.getItem('jwt')
  const { response } = useAxios('/api/users/me', 'get', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  useEffect(() => {
    if (response !== null) {
      setUser(response)
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
