import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const createFormData = (imageFiles: any) => {
  const formData = new FormData()
  for (let i = 0; i < imageFiles.length; i++) {
    formData.append('files', imageFiles[i])
  }

  return formData
}

const uploadImage = async (imageFiles: any) => {
  const formData = createFormData(imageFiles)

  return axios({
    method: 'post',
    url: `${BACKEND_URL}/api/upload`,
    data: formData,
  })
}

export default uploadImage
