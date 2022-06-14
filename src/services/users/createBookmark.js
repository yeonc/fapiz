import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const createBookmark = async ({ snsPostId, bookmarkUserId }) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/sns-posts/${snsPostId}`,
    data: {
      bookmarkUsers: [bookmarkUserId],
    },
  })
}

export default createBookmark
