import { PreviewImage } from 'types'

export const changeImageFilesToPreviewImage = (
  imageFiles: File[]
): PreviewImage => ({
  url: URL.createObjectURL(imageFiles[0]),
  altText: imageFiles[0].name,
})

export const changeImageFilesToPreviewImages = (
  imageFiles: File[]
): PreviewImage[] =>
  [...imageFiles].map(imageFile => ({
    url: URL.createObjectURL(imageFile),
    altText: imageFile.name,
  }))
