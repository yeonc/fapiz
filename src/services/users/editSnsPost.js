import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const editPost = async ({ postId, content, imageIds, fashionItemsInfo }) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/sns-posts/${postId}`,
    data: {
      data: {
        content,
        postImages: imageIds,
        fashionItemsInfo,
      },
    },
  })
}

export default editPost
