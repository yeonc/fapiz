import { useSWRConfig } from 'swr'
import LikeButton from '@mui/material/Checkbox'
import BookmarkButton from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import likePost from 'services/users/likePost'
import createBookmark from 'services/users/createBookmark'
import unlikePost from 'services/users/unlikePost'
import deleteBookmark from 'services/users/deleteBookmark'
import createUrlQuery from 'utils/createUrlQuery'

const query = createUrlQuery({
  'populate[0]': 'author.profileImage',
  'populate[1]': 'likeUsers',
  'populate[2]': 'bookmarkUsers',
  'populate[3]': 'postImage',
})

const ButtonsForLikeAndBookmark = ({
  snsPostId,
  myId,
  likeUsers,
  bookmarkUsers,
}) => {
  const { mutate } = useSWRConfig()

  const mutateKey = { url: `/api/sns-posts/${snsPostId}?${query}` }

  const isLike = likeUsers.some(likeUser => likeUser.id === myId)
  const isBookmark = bookmarkUsers.some(
    bookmarkUser => bookmarkUser.id === myId
  )

  const like = async () => {
    await likePost({ snsPostId, likeUserId: myId })
  }

  const unlike = async () => {
    const likePostUserIds = likeUsers.map(likeUser => likeUser.id)
    await unlikePost({ snsPostId, likePostUserIds, unlikeUserId: myId })
  }

  const bookmark = async () => {
    await createBookmark({
      snsPostId,
      bookmarkUserId: myId,
    })
  }

  const unBookmark = async () => {
    const bookmarkUserIds = bookmarkUsers.map(bookmarkUser => bookmarkUser.id)
    await deleteBookmark({
      snsPostId,
      bookmarkUserIds,
      deleteBookmarkUserId: myId,
    })
  }

  const handleLikeButtonClick = async () => {
    try {
      if (isLike) await unlike()
      if (!isLike) await like()
      mutate(mutateKey)
    } catch {
      console.error(error)
    }
  }

  const handleBookmarkButtonClick = async () => {
    try {
      if (isBookmark) await unBookmark()
      if (!isBookmark) await bookmark()
      mutate(mutateKey)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <LikeButton
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        checked={isLike}
        onClick={handleLikeButtonClick}
      />
      <span>{likeUsers.length}</span>
      <BookmarkButton
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        checked={isBookmark}
        onClick={handleBookmarkButtonClick}
      />
      <span>{bookmarkUsers.length}</span>
    </>
  )
}

export default ButtonsForLikeAndBookmark
