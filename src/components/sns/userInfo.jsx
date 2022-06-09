import UserProfile from 'components/sns/userProfile'
import ButtonsForUserCommunication from 'components/sns/buttonsForUserCommunication'

const UserInfo = ({ user, me }) => {
  const isMe = user.id === me?.id

  return (
    <header>
      <UserProfile user={user} />
      {!isMe && <ButtonsForUserCommunication user={user} me={me} />}
    </header>
  )
}

export default UserInfo
