import Checkbox from '@mui/material/Checkbox'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import createBookmark from 'services/snsPost/createBookmark'
import deleteBookmark from 'services/snsPost/deleteBookmark'
import { UserWithAttributes } from 'types/user'

type BookmarkButtonProps = {
  myId: number
  targetId: number
  bookmarkUsers: UserWithAttributes[]
  afterBookmark: () => void
  isShowBookmarkUsersNumber: boolean
}

const BookmarkButton = ({
  myId,
  targetId,
  bookmarkUsers,
  afterBookmark,
  isShowBookmarkUsersNumber,
}: BookmarkButtonProps) => {
  const isBookmarked = bookmarkUsers.some(
    bookmarkUser => bookmarkUser.id === myId
  )
  const bookmarkUserIds = bookmarkUsers.map(bookmarkUser => bookmarkUser.id)

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
