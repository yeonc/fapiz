import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const uploadImage = async formData => {
  return axios({
    method: 'post',
    url: `${BACKEND_URL}/api/upload`,
    data: formData,
  })
}

export default uploadImage
