import UserProfile from 'components/sns/userProfile'
import ButtonsForUserCommunication from 'components/sns/buttonsForUserCommunication'
import useFetchUser from 'hooks/useFetchUser'

const UserInfo = ({ user }) => {
  const { user: loggedInUser, error, loading } = useFetchUser()
  const isMe = user.id === loggedInUser?.id

  if (loading) {
    return <p>로딩중...</p>
  }

  if (error) {
    return <p>에러가 발생했습니다. 홈으로 돌아가세요</p>
  }

  return (
    <header>
      <UserProfile user={user} />
      {!isMe && <ButtonsForUserCommunication user={user} />}
    </header>
  )
}

export default UserInfo
