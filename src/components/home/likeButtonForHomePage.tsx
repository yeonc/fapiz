import { useState } from 'react'
import { css } from '@emotion/react'
import Checkbox from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import likePost from 'services/snsPost/likePost'
import unlikePost from 'services/snsPost/unlikePost'
import { UserWithAttributes } from 'types/user'
import { LIKE_BUTTON_PINK } from 'styles/constants/color'

const LIKE_BUTTON_ID = 'like-button-for-home-page'

const favoriteColor = css`
  color: ${LIKE_BUTTON_PINK};
`

type LikeButtonForHomePageProps = {
  myId: number
  targetId: number
  likeUsers: UserWithAttributes[]
  isShowLikeUsersNumber: boolean
  borderColor?: string
}

const LikeButtonForHomePage = ({
  myId,
  targetId,
  likeUsers,
  isShowLikeUsersNumber,
  borderColor,
}: LikeButtonForHomePageProps) => {
  const initialIsLiked = likeUsers.some(likeUser => likeUser.id === myId)
  const likeUserIds = likeUsers.map(likeUser => likeUser.id)

  const [isLiked, setIsLiked] = useState(initialIsLiked)

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
      if (isLiked) {
        await unlike()
        setIsLiked(false)
      }
      if (!isLiked) {
        await like()
        setIsLiked(true)
      }
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

LikeButtonForHomePage.id = LIKE_BUTTON_ID

export default LikeButtonForHomePage
