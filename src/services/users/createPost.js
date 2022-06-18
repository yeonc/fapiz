import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const createPost = async ({ postText, itemInfo, authorId, postImageIds }) => {
  return axios({
    method: 'post',
    url: `${BACKEND_URL}/api/sns-posts`,
    data: {
      data: {
        content: postText,
        itemInformation: itemInfo,
        author: authorId,
        postImage: postImageIds,
      },
    },
  })
}

export default createPost
