import { Image } from 'types/image'

export const changeImageFileToPreviewImage = (imageFile: File): Image => ({
  url: URL.createObjectURL(imageFile),
  altText: imageFile.name,
})

export const changeImageFilesToPreviewImages = (
  imageFiles: FileList
): Image[] => Array.from(imageFiles).map(changeImageFileToPreviewImage)
