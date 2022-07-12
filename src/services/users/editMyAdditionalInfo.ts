import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const editMyAdditionalInfo = async ({
  myId,
  gender,
  bodyShape,
  fashionStyles,
}) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/users/${myId}`,
    data: {
      gender,
      bodyShape,
      fashionStyles,
    },
  })
}

export default editMyAdditionalInfo
