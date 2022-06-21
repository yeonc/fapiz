import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const editUserDetailInfo = async ({
  userId,
  gender,
  bodyShape,
  fashionStyles,
}) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/users/${userId}`,
    data: {
      gender,
      bodyShape,
      fashionStyles,
    },
  })
}

export default editUserDetailInfo
