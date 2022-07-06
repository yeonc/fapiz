export const changeImageFilesToPreviewImage = (imageFiles: any) => ({
  url: URL.createObjectURL(imageFiles[0]),
  altText: imageFiles[0].name,
})

export const changeImageFilesToPreviewImages = (imageFiles: any) =>
  [...imageFiles].map(imageFile => ({
    url: URL.createObjectURL(imageFile),
    altText: imageFile.name,
  }))
