import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import UserInfo from 'components/sns/userInfo'
import SnsPosts from 'components/sns/snsPosts'
import useGetRequest from 'hooks/useGetRequest'

const SnsPageByUserId = () => {
  const router = useRouter()
  const { userId } = router.query

  const { response, error, loading } = useGetRequest({
    url: `/api/users/${userId}`,
  })

  if (loading) {
    return <p>로딩중...</p>
  }

  if (error) {
    return <p>에러가 발생했습니다. 홈으로 돌아가세요</p>
  }

  const user = response?.data

  return (
    <>
      <UserInfo user={user} />
      <SnsPosts userId={user.id} />
    </>
  )
}

export default withHeader(SnsPageByUserId)
