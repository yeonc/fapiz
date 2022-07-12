export const changeImageFilesToPreviewImage = imageFiles => ({
  url: URL.createObjectURL(imageFiles[0]),
  altText: imageFiles[0].name,
})

export const changeImageFilesToPreviewImages = imageFiles =>
  [...imageFiles].map(imageFile => ({
    url: URL.createObjectURL(imageFile),
    altText: imageFile.name,
  }))
