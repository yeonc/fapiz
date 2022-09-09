import { css } from '@emotion/react'
import Checkbox from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import likePost from 'services/snsPost/likePost'
import unlikePost from 'services/snsPost/unlikePost'
import { LikeUser } from 'types/user'
import { LIKE_BUTTON_PINK } from 'styles/constants/color'

const LIKE_BUTTON_ID = 'like-button'

const favoriteColor = css`
  color: ${LIKE_BUTTON_PINK};
`

type LikeButtonProps = {
  myId: number
  targetId: number
  likeUsers: LikeUser[]
  afterLike: () => void
  isShowLikeUsersNumber: boolean
  borderColor?: string
}

const LikeButton = ({
  myId,
  targetId,
  likeUsers,
  afterLike,
  isShowLikeUsersNumber,
  borderColor,
}: LikeButtonProps) => {
  const isLiked = likeUsers.some(likeUser => likeUser.id === myId)
  const likeUserIds = likeUsers.map(likeUser => likeUser.id)

  const like = async () => {
    await likePost({ targetPostId: targetId, myId, likeUserIds })
  }

  const unlike = async () => {
    await unlikePost({
      targetPostId: targetId,
      myId,
      likeUserIds,
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
        icon={<FavoriteBorder htmlColor={borderColor} />}
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
