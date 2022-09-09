import Checkbox from '@mui/material/Checkbox'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import createBookmark from 'services/snsPost/createBookmark'
import deleteBookmark from 'services/snsPost/deleteBookmark'

const BookmarkButton = ({
  myId,
  targetId,
  bookmarkUsers,
  afterBookmark,
  isShowBookmarkUsersNumber,
}) => {
  const isBookmarked = bookmarkUsers.some(
    (bookmarkUser: any) => bookmarkUser.id === myId
  )
  const bookmarkUserIds = bookmarkUsers.map(
    (bookmarkUser: any) => bookmarkUser.id
  )

  const bookmark = async () => {
    await createBookmark({
      targetPostId: targetId,
      myId,
      bookmarkUserIds,
    })
  }

  const unBookmark = async () => {
    await deleteBookmark({
      targetPostId: targetId,
      myId,
      bookmarkUserIds,
    })
  }

  const handleBookmarkButtonClick = async () => {
    try {
      if (isBookmarked) await unBookmark()
      if (!isBookmarked) await bookmark()
      afterBookmark()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Checkbox
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        checked={isBookmarked}
        onClick={handleBookmarkButtonClick}
      />
      {isShowBookmarkUsersNumber && <span>{bookmarkUsers.length}</span>}
    </>
  )
}

export default BookmarkButton
