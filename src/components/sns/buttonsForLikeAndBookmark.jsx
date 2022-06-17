import LikeButton from '@mui/material/Checkbox'
import BookmarkButton from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import likePost from 'services/users/likePost'
import createBookmark from 'services/users/createBookmark'

const ButtonsForLikeAndBookmark = ({
  likeCountNum,
  snsPostId,
  targetUserId,
}) => {
  const handleLikeButtonClick = () => {
    likePost({ snsPostId, likeUserId: targetUserId })
      .then(() => console.log)
      .catch(console.error)
  }

  const handleBookmarkButtonClick = () => {
    createBookmark({
      snsPostId,
      bookmarkUserId: targetUserId,
    })
      .then(() => console.log)
      .catch(console.error)
  }

  return (
    <>
      <LikeButton
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        onClick={handleLikeButtonClick}
      />
      <span>{likeCountNum}</span>
      <BookmarkButton
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        onClick={handleBookmarkButtonClick}
      />
    </>
  )
}

export default ButtonsForLikeAndBookmark
