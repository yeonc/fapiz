import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import UserInfo from 'components/sns/userInfo'
import SnsPosts from 'components/sns/snsPosts'
import useGetRequest from 'hooks/useGetRequest'
import { BACKEND_URL } from 'constants/constants'

const SnsPageByUserId = () => {
  const [snsPageUser, setSnsPageUser] = useState()

  const router = useRouter()
  const { userId } = router.query
  const { response } = useGetRequest(BACKEND_URL, `/api/users/${userId}`)

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

export default withHeader(SnsPageByUserId)
