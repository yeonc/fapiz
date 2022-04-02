import { useEffect, useState } from 'react'
import UserProfile from 'components/sns/userProfile'
import UserButtons from 'components/sns/userButtons'
import useGetRequest from 'hooks/useGetRequest'
import { BACKEND_URL, IS_SERVER } from 'constants/constants'

const UserInfo = ({ snsPageUser }) => {
  const [snsPageUserId, setSnsPageUserId] = useState(null)
  const [loggedInUserId, setLoggedInUserId] = useState(null)
  const isMe = snsPageUserId === loggedInUserId

  const token = !IS_SERVER && localStorage.getItem('jwt')
  const { response } = useGetRequest(BACKEND_URL, '/api/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  useEffect(() => {
    if (response !== null) {
      const loggedInUserInfo = response.data
      setLoggedInUserId(loggedInUserInfo.id)
      setSnsPageUserId(snsPageUser?.id)
    }
  }, [response, snsPageUser?.id])

  return (
    <header>
      <UserProfile snsPageUser={snsPageUser} />
      {isMe || <UserButtons />}
    </header>
  )
}

export default UserInfo
