import { useSWRConfig } from 'swr'
import Button from '@mui/material/Button'
import follow from 'services/users/follow'
import unfollow from 'services/users/unfollow'

const FollowToggleButton = ({ me, targetUser }) => {
  const { mutate } = useSWRConfig()

  const followUser = async () => {
    try {
      await follow({ myId: me?.id, targetUserId: targetUser.id })
    } catch (error) {
      console.error(error)
    }
  }

  const unfollowUser = async () => {
    try {
      const myFollowingUserIds = me.following.map(user => user.id)
      await unfollow({
        myId: me.id,
        targetUserId: targetUser.id,
        myFollowingUserIds,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const isFollowing = targetUser.follower?.some(person => person.id === me?.id)

  const buttonText = isFollowing ? '팔로우 취소하기' : '팔로우하기'
  const handleFollow = isFollowing ? unfollowUser : followUser

  const handleClick = async () => {
    await handleFollow()
    mutate({ url: `/api/users/${targetUser.id}` })
  }

  return <Button onClick={handleClick}>{buttonText}</Button>
}

export default FollowToggleButton
