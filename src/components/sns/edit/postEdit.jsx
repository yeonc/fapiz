import { useState } from 'react'
import editSnsPost from 'services/users/editSnsPost'
import uploadImage from 'services/users/uploadImage'
import generateIdIntoObject from 'utils/generateIdIntoObject'
import { changeImageFilesToPreviewImages } from 'utils/previewImage'
import { BACKEND_URL } from 'constants/constants'

const EMPTY_FASHION_ITEM_INFO = { category: '', price: '', buyingPlace: '' }

const PostEdit = ({ snsPost, afterEditPost, children }) => {
  const initialPreviewImages = snsPost.attributes.postImages.data.map(
    image => ({
      url: BACKEND_URL + image.attributes.url,
      altText: image.attributes.alternativeText,
    })
  )
  const newEmptyFashionItemInfo = generateIdIntoObject(EMPTY_FASHION_ITEM_INFO)
  const initialFashionItemsInfo = snsPost.attributes.fashionIemsInfo ?? [
    newEmptyFashionItemInfo,
  ]
  const initialPostText = snsPost.attributes.content

  const [imageFiles, setImageFiles] = useState(null)
  const [previewImages, setPreviewImages] = useState(initialPreviewImages)
  const [fashionItemsInfo, setFashionItemsInfo] = useState(
    initialFashionItemsInfo
  )
  const [postText, setPostText] = useState(initialPostText)

  const handleImageFilesChange = imageFiles => {
    setImageFiles(imageFiles)
    const previewImagesFromImageFiles =
      changeImageFilesToPreviewImages(imageFiles)
    setPreviewImages(previewImagesFromImageFiles)
  }

  const handleFashionItemsInfoChange = fashionItemsInfo => {
    setFashionItemsInfo(fashionItemsInfo)
  }

  const handleFashionItemInfoAddMoreButtonClick = () => {
    setFashionItemsInfo(prev => {
      const newEmptyFashionItemInfo = generateIdIntoObject(
        EMPTY_FASHION_ITEM_INFO
      )
      return prev.concat(newEmptyFashionItemInfo)
    })
  }

  const handleFashionItemInfoDeleteButtonClick = fashionItemInfoIdToDelete => {
    setFashionItemsInfo(prev => {
      return prev.filter(prev => prev.id !== fashionItemInfoIdToDelete)
    })
  }

  const handlePostTextChange = postText => {
    setPostText(postText)
  }

  const editPostWithImage = async uploadedImageIds => {
    return editSnsPost({
      postId: snsPost.id,
      content: postText,
      imageIds: uploadedImageIds,
      fashionItemsInfo,
    })
  }

  const editPostWithoutImage = async () => {
    return editSnsPost({
      postId: snsPost.id,
      content: postText,
      fashionItemsInfo,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      if (!imageFiles) {
        await editPostWithoutImage()
      }

      if (imageFiles) {
        const res = await uploadImage(imageFiles)
        const uploadedImageIds = res.data.map(image => image.id)
        await editPostWithImage(uploadedImageIds)
      }

      afterEditPost()
    } catch (error) {
      console.error(error)
    }
  }

  return children({
    imageFiles,
    previewImages,
    fashionItemsInfo,
    postText,
    handleImageFilesChange,
    handleFashionItemsInfoChange,
    handleFashionItemInfoAddMoreButtonClick,
    handleFashionItemInfoDeleteButtonClick,
    handlePostTextChange,
    handleSubmit,
  })
}

export default PostEdit
