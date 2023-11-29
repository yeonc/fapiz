import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/constants'
import { UploadImageResponse } from 'types/image'

const uploadImage = async (
  imageFiles: FileList
): Promise<AxiosResponse<UploadImageResponse>> => {
  const formData = createFormData(imageFiles)
  return axios({
    method: 'post',
    url: `${BACKEND_URL}/api/upload`,
    data: formData,
  })
}
export default uploadImage

const createFormData = (imageFiles: FileList): FormData => {
  const formData = new FormData()
  for (let i = 0; i < imageFiles.length; i++) {
    formData.append('files', imageFiles[i])
  }
  return formData
}
