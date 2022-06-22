import Checkbox from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import likePost from 'services/users/likePost'
import unlikePost from 'services/users/unlikePost'

const LikeButton = ({
  myId,
  targetForLike,
  afterLike,
  isShowLikeUsersNumber,
}) => {
  const likeUsers = targetForLike.attributes.likeUsers.data
  const isLiked = likeUsers.some(likeUser => likeUser.id === myId)

  const like = async () => {
    await likePost({ snsPostId: targetForLike.id, likeUserId: myId })
  }

  const unlike = async () => {
    const likePostUserIds = likeUsers.map(likeUser => likeUser.id)
    await unlikePost({
      snsPostId: targetForLike.id,
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
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        checked={isLiked}
        onClick={handleLikeButtonClick}
      />
      {isShowLikeUsersNumber && <span>{likeUsers.length}</span>}
    </>
  )
}

export default LikeButton
