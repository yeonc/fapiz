import Checkbox from '@mui/material/Checkbox'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import createBookmark from 'services/bookmark/createBookmark'
import deleteBookmark from 'services/bookmark/deleteBookmark'

// TODO: 북마크 버튼 눌렀을 때 UI에 느리게 반영되는 것 개선하기
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
