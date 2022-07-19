import { BACKEND_URL } from 'constants/constants'

type FullImageUrl = string
type AddBackendUrlToImageUrl = (imageUrl?: string) => FullImageUrl | undefined

const addBackendUrlToImageUrl: AddBackendUrlToImageUrl = imageUrl => {
  return imageUrl ? BACKEND_URL + imageUrl : undefined
}

export default addBackendUrlToImageUrl
