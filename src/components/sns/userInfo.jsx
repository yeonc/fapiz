import UserProfile from 'components/sns/userProfile'
import UserButtons from 'components/sns/userButtons'

const UserInfo = ({ user }) => {
  return (
    <header>
      <UserProfile user={user} />
      <UserButtons />
    </header>
  )
}

export default UserInfo
