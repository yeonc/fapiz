import { useState } from 'react'
import UserProfile from 'components/sns/userProfile'
import ButtonsForUserCommunication from 'components/sns/buttonsForUserCommunication'
import useFetchUser from 'hooks/useFetchUser'

const UserInfo = ({ user }) => {
  const [followerCount, setFollowerCount] = useState(user.follower.length)

  const afterFollow = () => setFollowerCount(prev => prev + 1)
  const afterUnfollow = () => setFollowerCount(prev => prev - 1)

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
      <UserProfile user={user} followerCount={followerCount} />
      {!isMe && (
        <ButtonsForUserCommunication
          user={user}
          afterFollow={afterFollow}
          afterUnfollow={afterUnfollow}
        />
      )}
    </header>
  )
}

export default UserInfo
