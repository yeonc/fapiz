import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const deleteBookmark = async ({
  snsPostId,
  bookmarkUserIds,
  deleteBookmarkUserId,
}) => {
  axios({
    method: 'put',
    url: `${BACKEND_URL}/api/sns-posts/${snsPostId}`,
    data: {
      bookmarkUsers: null,
    },
  })
    .catch(() => {
      axios({
        method: 'put',
        url: `${BACKEND_URL}/api/sns-posts/${snsPostId}`,
        data: {
          bookmarkUsers: [bookmarkUserIds],
        },
      })
    })
    .then(() => {
      return axios({
        method: 'put',
        url: `${BACKEND_URL}/api/sns-posts/${snsPostId}`,
        data: {
          bookmarkUsers: bookmarkUserIds.filter(
            id => id !== deleteBookmarkUserId
          ),
        },
      })
    })
}

export default deleteBookmark
