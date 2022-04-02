import { useState, useEffect } from 'react'
import withHeader from 'hocs/withHeader'
import UserInfo from 'components/sns/userInfo'
import SnsPosts from 'components/sns/snsPosts'
import useGetRequest from 'hooks/useGetRequest'
import { BACKEND_URL, IS_SERVER } from 'constants/constants'

const SnsPage = () => {
  const [snsPageUser, setSnsPageUser] = useState()

  const token = !IS_SERVER && localStorage.getItem('jwt')
  const { response } = useGetRequest(BACKEND_URL, '/api/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  useEffect(() => {
    if (response !== null) {
      setSnsPageUser(response.data)
    }
  }, [response])

  return (
    <>
      <UserInfo snsPageUser={snsPageUser} />
      <SnsPosts snsPageUserId={snsPageUser?.id} />
    </>
  )
}

export default withHeader(SnsPage)
