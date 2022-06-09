import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import UserInfo from 'components/sns/userInfo'
import SnsPosts from 'components/sns/snsPosts'
import useUser from 'hooks/useUser'

const SnsPage = ({ me }) => {
  const router = useRouter()
  const { userId } = router.query

  const { user, isError, isLoading } = useUser(userId)

  if (isLoading) {
    return <p>로딩중...</p>
  }

  if (isError) {
    return <p>에러가 발생했습니다. 홈으로 돌아가세요</p>
  }

  return (
    <>
      <UserInfo me={me} />
      <SnsPosts userId={user.id} />
    </>
  )
}

export default withHeader(SnsPage)
