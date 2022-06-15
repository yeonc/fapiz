import LikeButton from '@mui/material/Checkbox'
import BookmarkButton from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'

const ButtonsForLikeAndBookmark = ({ likeCountNum }) => (
  <>
    <LikeButton icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
    <span>{likeCountNum}</span>
    <BookmarkButton
      icon={<BookmarkBorderIcon />}
      checkedIcon={<BookmarkIcon />}
    />
  </>
)

export default ButtonsForLikeAndBookmark
