import LoadingButton from '@mui/lab/LoadingButton'
import useError from 'hooks/useError'
import { useState } from 'react'
import follow from 'services/user/follow'
import unfollow from 'services/user/unfollow'

const ERROR_BUTTON_TIMEOUT_SEC = 3

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
  const [isLoading, setIsLoading] = useState(false)
  const { error, handleError } = useError<string>()

  const followUser = async () => {
    await follow({
      myId,
      targetUserId,
      targetUserFollowerIds,
    })
  }

  const unfollowUser = async () => {
    await unfollow({
      myId,
      targetUserId,
      targetUserFollowerIds,
    })
  }

  const isFollowing = targetUserFollowerIds.some(
    followerId => followerId === myId
  )
  const buttonVariant = isFollowing ? 'outlined' : 'contained'
  const buttonText = isFollowing ? '팔로우 취소하기' : '팔로우하기'

  const handleClick = async () => {
    setIsLoading(true)
    try {
      if (isFollowing) await unfollowUser()
      if (!isFollowing) await followUser()
      afterFollow()
    } catch {
      handleError('error', ERROR_BUTTON_TIMEOUT_SEC)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LoadingButton
      size="small"
      variant={buttonVariant}
      color={error ? 'error' : undefined}
      onClick={handleClick}
      loading={isLoading}
      loadingPosition="center"
    >
      {error ? `${error}` : buttonText}
    </LoadingButton>
  )
}

export default FollowToggleButton
