import { useState } from 'react'
import UserProfile from 'components/sns/userProfile'
import ButtonsForUserCommunication from 'components/sns/buttonsForUserCommunication'

const UserInfo = ({ user, me }) => {
  const [followerCount, setFollowerCount] = useState(user.follower.length)

  const afterFollow = () => setFollowerCount(prev => prev + 1)
  const afterUnfollow = () => setFollowerCount(prev => prev - 1)

  const isMe = user.id === me?.id

  return (
    <header>
      <UserProfile user={user} followerCount={followerCount} />
      {!isMe && (
        <ButtonsForUserCommunication
          user={user}
          me={me}
          afterFollow={afterFollow}
          afterUnfollow={afterUnfollow}
        />
      )}
    </header>
  )
}

export default UserInfo
