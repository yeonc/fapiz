import { PreviewImage } from 'types/image'

export const changeImageFileToPreviewImage = (
  imageFile: File
): PreviewImage => ({
  url: URL.createObjectURL(imageFile),
  altText: imageFile.name,
})

export const changeImageFilesToPreviewImages = (
  imageFiles: File[]
): PreviewImage[] =>
  [...imageFiles].map(imageFile => ({
    url: URL.createObjectURL(imageFile),
    altText: imageFile.name,
  }))
