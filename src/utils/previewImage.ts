export const changeImageFilesToPreviewImage = (imageFiles: File[]) => ({
  url: URL.createObjectURL(imageFiles[0]),
  altText: imageFiles[0].name,
})

export const changeImageFilesToPreviewImages = (imageFiles: File[]) =>
  [...imageFiles].map(imageFile => ({
    url: URL.createObjectURL(imageFile),
    altText: imageFile.name,
  }))
