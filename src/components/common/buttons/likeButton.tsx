import { css } from '@emotion/react'
import styled from '@emotion/styled'
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

const StyledFavoriteBorder = styled(FavoriteBorder)<{ color: string }>`
  color: ${props => props.color};
`

type LikeButtonProps = {
  myId: number
  targetId: number
  likeUsers: LikeUser[]
  afterLike: () => void
  isShowLikeUsersNumber: boolean
  borderColor: any
}

// TODO: 좋아요 버튼 눌렀을 때 UI에 느리게 반영되는 것 개선하기
const LikeButton = ({
  myId,
  targetId,
  likeUsers,
  afterLike,
  isShowLikeUsersNumber,
  borderColor,
}: LikeButtonProps) => {
  const isLiked = likeUsers.some(likeUser => likeUser.id === myId)
  const likePostUserIds = likeUsers.map(likeUser => likeUser.id)
  const likeUsersAfterLiked = [...likePostUserIds, myId]

  const like = async () => {
    await likePost({ snsPostId: targetId, likeUsersAfterLiked })
  }

  const unlike = async () => {
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
        icon={<StyledFavoriteBorder color={borderColor} />}
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
