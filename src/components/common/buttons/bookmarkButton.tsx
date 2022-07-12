import Checkbox from '@mui/material/Checkbox'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import createBookmark from 'services/users/createBookmark'
import deleteBookmark from 'services/users/deleteBookmark'

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

  const bookmark = async () => {
    await createBookmark({
      snsPostId: targetId,
      bookmarkUserId: myId,
    })
  }

  const unBookmark = async () => {
    const bookmarkUserIds = bookmarkUsers.map(
      (bookmarkUser: any) => bookmarkUser.id
    )
    await deleteBookmark({
      snsPostId: targetId,
      bookmarkUserIds,
      deleteBookmarkUserId: myId,
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
