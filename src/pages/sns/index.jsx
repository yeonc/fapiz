import { useState, useEffect } from 'react'
import withHeader from 'hocs/withHeader'
import UserInfo from 'components/sns/userInfo'
import SnsPosts from 'components/sns/snsPosts'
import useGetRequest from 'hooks/useGetRequest'
import { BACKEND_URL, IS_SERVER } from 'constants/constants'

const SnsPageForLoggedInUser = () => {
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
    <>
      <UserInfo user={user} />
      <SnsPosts userId={user?.id} />
    </>
  )
}

export default withHeader(SnsPageForLoggedInUser)
