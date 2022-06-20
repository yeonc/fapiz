import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const editUserDetailInfo = async ({
  userId,
  gender,
  bodyShape,
  fashionStyle,
}) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/users/${userId}`,
    data: {
      data: {
        gender,
        bodyShape,
        fashionStyle,
      },
    },
  })
}

export default editUserDetailInfo
