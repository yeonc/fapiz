import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const unlikePost = async ({ snsPostId, likePostUserIds, unlikeUserId }) => {
  axios({
    method: 'put',
    url: `${BACKEND_URL}/api/sns-posts/${snsPostId}`,
    data: {
      likeUsers: null,
    },
  })
    .catch(() => {
      axios({
        method: 'put',
        url: `${BACKEND_URL}/api/sns-posts/${snsPostId}`,
        data: {
          likeUsers: [likePostUserIds],
        },
      })
    })
    .then(() => {
      return axios({
        method: 'put',
        url: `${BACKEND_URL}/api/sns-posts/${snsPostId}`,
        data: {
          likeUsers: likePostUserIds.filter(id => id !== unlikeUserId),
        },
      })
    })
}

export default unlikePost
