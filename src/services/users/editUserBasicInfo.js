import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const editUserBasicInfo = async ({
  myId,
  username,
  height,
  weight,
  profileImageId,
}) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/users/${myId}`,
    data: {
      username,
      height,
      weight,
      profileImage: profileImageId,
    },
  })
}

export default editUserBasicInfo
