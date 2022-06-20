import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const editUserBasicInfo = async ({
  userId,
  username,
  height,
  weight,
  profileImageId,
}) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/users/${userId}`,
    data: {
      data: {
        username,
        height,
        weight,
        profileImage: profileImageId,
      },
    },
  })
}

export default editUserBasicInfo
