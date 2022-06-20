import { useSWRConfig } from 'swr'
import Checkbox from '@mui/material/Checkbox'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import createBookmark from 'services/users/createBookmark'
import deleteBookmark from 'services/users/deleteBookmark'
import createUrlQuery from 'utils/createUrlQuery'

const query = createUrlQuery({
  'populate[0]': 'author.profileImage',
  'populate[1]': 'likeUsers',
  'populate[2]': 'bookmarkUsers',
  'populate[3]': 'postImage',
})

const BookmarkButton = ({ me, targetPost, isShowUsersNum }) => {
  const { mutate } = useSWRConfig()
  const mutateKey = { url: `/api/sns-posts/${targetPost.id}?${query}` }

  const bookmarkUsers = targetPost.bookmarkUsers.data
  const isBookmark = bookmarkUsers.some(
    bookmarkUser => bookmarkUser.id === me.Id
  )

  const bookmark = async () => {
    await createBookmark({
      snsPostId: targetPost.id,
      bookmarkUserId: me.Id,
    })
  }

  const unBookmark = async () => {
    const bookmarkUserIds = bookmarkUsers.map(bookmarkUser => bookmarkUser.id)
    await deleteBookmark({
      snsPostId: targetPost.id,
      bookmarkUserIds,
      deleteBookmarkUserId: me.Id,
    })
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
      <Checkbox
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        checked={isBookmark}
        onClick={handleBookmarkButtonClick}
      />
      {isShowUsersNum && <span>{bookmarkUsers.length}</span>}
    </>
  )
}

export default BookmarkButton
