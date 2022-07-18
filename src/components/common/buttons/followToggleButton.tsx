import Button from '@mui/material/Button'
import follow from 'services/users/follow'
import unfollow from 'services/users/unfollow'

// TODO: 팔로우 버튼 눌렀을 때 UI에 느리게 반영되는 것 개선하기
// TODO: 팔로우 버튼 눌렀을 때 버튼 텍스트가 바로 바뀌지 않는 현상 고치기
const FollowToggleButton = ({
  myId,
  myFollowings,
  targetUserId,
  afterFollow,
}) => {
  const followUser = async () => {
    try {
      await follow({ myId, targetUserId })
    } catch (error) {
      console.error(error)
    }
  }

  const unfollowUser = async () => {
    try {
      const myFollowingUserIds = myFollowings.map((user: any) => user.id)
      await unfollow({
        myId,
        targetUserId,
        myFollowingUserIds,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const isFollowing = myFollowings.some(
    (following: any) => following.id === targetUserId
  )

  const buttonText = isFollowing ? '팔로우 취소하기' : '팔로우하기'
  const handleFollow = isFollowing ? unfollowUser : followUser

  const handleClick = async () => {
    await handleFollow()
    afterFollow()
  }

  return <Button onClick={handleClick}>{buttonText}</Button>
}

export default FollowToggleButton
