import Checkbox from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import likePost from 'services/users/likePost'
import unlikePost from 'services/users/unlikePost'

const LIKE_BUTTON_ID = 'like-button'

// TODO: 좋아요 버튼 눌렀을 때 UI에 느리게 반영되는 것 개선하기
const LikeButton = ({
  myId,
  targetId,
  likeUsers,
  afterLike,
  isShowLikeUsersNumber,
}) => {
  const isLiked = likeUsers.some((likeUser: any) => likeUser.id === myId)

  const like = async () => {
    await likePost({ snsPostId: targetId, likeUserId: myId })
  }

  const unlike = async () => {
    const likePostUserIds = likeUsers.map((likeUser: any) => likeUser.id)
    await unlikePost({
      snsPostId: targetId,
      likePostUserIds,
      unlikeUserId: myId,
    })
  }

  const handleLikeButtonClick = async () => {
    try {
      if (isLiked) await unlike()
      if (!isLiked) await like()
      afterLike()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Checkbox
        id={LIKE_BUTTON_ID}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        checked={isLiked}
        onClick={handleLikeButtonClick}
      />
      {isShowLikeUsersNumber && <span>{likeUsers.length}</span>}
    </>
  )
}

LikeButton.id = LIKE_BUTTON_ID

export default LikeButton
