import { useRouter } from 'next/router'
import UserProfile from 'components/sns/userProfile'
import ButtonsForUserCommunication from 'components/sns/buttonsForUserCommunication'
import useUser from 'hooks/useUser'

const UserInfo = ({ me }) => {
  const router = useRouter()
  const { userId } = router.query

  const { user, isLoading, isError } = useUser(userId)

  if (isLoading) {
    return <p>로딩중...</p>
  }

  if (isError) {
    return <p>에러가 발생했습니다. 홈으로 돌아가세요</p>
  }

  const isMe = user.id === me?.id

  return (
    <header>
      <UserProfile />
      {!isMe && <ButtonsForUserCommunication me={me} />}
    </header>
  )
}

export default UserInfo
