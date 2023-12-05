import Button from '@mui/material/Button'
import follow from 'services/user/follow'
import unfollow from 'services/user/unfollow'

type FollowToggleButtonProps = {
  myId: number
  targetUserId: number
  targetUserFollowerIds: number[]
  afterFollow: () => void
}
const FollowToggleButton = ({
  myId,
  targetUserId,
  targetUserFollowerIds,
  afterFollow,
}: FollowToggleButtonProps) => {
  const followUser = async () => {
    try {
      await follow({
        myId,
        targetUserId,
        targetUserFollowerIds,
      })
    } catch (error) {
      console.error(error)
    }
  }
  const unfollowUser = async () => {
    try {
      await unfollow({
        myId,
        targetUserId,
        targetUserFollowerIds,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const isFollowing = targetUserFollowerIds.some(
    followerId => followerId === myId
  )
  const buttonVariant = isFollowing ? 'outlined' : 'contained'
  const buttonText = isFollowing ? '팔로우 취소하기' : '팔로우하기'
  const handleFollow = isFollowing ? unfollowUser : followUser

  const handleClick = async () => {
    await handleFollow()
    afterFollow()
  }

  return (
    <Button size="small" variant={buttonVariant} onClick={handleClick}>
      {buttonText}
    </Button>
  )
}

export default FollowToggleButton
