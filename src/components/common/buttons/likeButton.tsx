import { css } from '@emotion/react'
import Checkbox from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import likePost from 'services/snsPost/likePost'
import unlikePost from 'services/snsPost/unlikePost'
import { PINK_LIKE_BUTTON } from 'styles/constants/color'

const LIKE_BUTTON_ID = 'like-button'

const favoriteColor = css`
  color: ${PINK_LIKE_BUTTON};
`

const setFavoriteBorderColor = (color: string) => css`
  color: ${color};
`

// TODO: 좋아요 버튼 눌렀을 때 UI에 느리게 반영되는 것 개선하기
const LikeButton = ({
  myId,
  targetId,
  likeUsers,
  afterLike,
  isShowLikeUsersNumber,
  likeIconBorderColor,
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
        icon={
          <FavoriteBorder css={setFavoriteBorderColor(likeIconBorderColor)} />
        }
        checkedIcon={<Favorite css={favoriteColor} />}
        checked={isLiked}
        onClick={handleLikeButtonClick}
      />
      {isShowLikeUsersNumber && <span>{likeUsers.length}</span>}
    </>
  )
}

LikeButton.id = LIKE_BUTTON_ID

export default LikeButton
