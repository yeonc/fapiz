import UserProfile from 'components/sns/userProfile'
import ButtonsForUserCommunication from 'components/sns/buttonsForUserCommunication'
import FollowToggleButton from 'components/common/buttons/followToggleButton'
import MessageButton from 'components/common/buttons/messageButton'
import useMe from 'hooks/useMe'

const UserInfo = ({ user }) => {
  const { me, isLoading, error } = useMe()

  if (isLoading) {
    return <p>로딩중...</p>
  }

  if (error) {
    return <p>에러가 발생했습니다. 홈으로 돌아가세요</p>
  }

  const isMe = user.id === me?.id

  return (
    <header>
      <UserProfile user={user} />
      {!isMe && (
        <ButtonsForUserCommunication
          followToggleButton={<FollowToggleButton me={me} targetUser={user} />}
          messageButton={<MessageButton userId={user.id} />}
        />
      )}
    </header>
  )
}

export default UserInfo
