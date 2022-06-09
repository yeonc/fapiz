import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import follow from 'services/users/follow'
import unfollow from 'services/users/unfollow'

const FollowToggleButton = ({ user, me, afterFollow, afterUnfollow }) => {
  const isFollowingInitialState = me?.following.some(
    person => person.id === user.id
  )
  const [isFollowing, setIsFollowing] = useState(isFollowingInitialState)

  useEffect(() => {
    setIsFollowing(isFollowingInitialState)
  }, [me])

  const followUser = async () => {
    await follow({ myId: me.id, targetUserId: user.id })
    setIsFollowing(true)
    afterFollow()
  }

  const unfollowUser = async () => {
    const myFollowingUserIds = me.following.map(user => user.id)
    await unfollow({
      myId: me.id,
      targetUserId: user.id,
      myFollowingUserIds,
    })
    setIsFollowing(false)
    afterUnfollow()
  }

  const buttonText = isFollowing ? '팔로우 취소하기' : '팔로우하기'
  const handleFollow = isFollowing ? unfollowUser : followUser

  return <Button onClick={handleFollow}>{buttonText}</Button>
}

export default FollowToggleButton
