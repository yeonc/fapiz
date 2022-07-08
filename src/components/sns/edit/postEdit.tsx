import { FormEvent, useState } from 'react'
import editPost from 'services/users/editPost'
import uploadImage from 'services/users/uploadImage'
import generateIdIntoObject from 'utils/generateIdIntoObject'
import { changeImageFilesToPreviewImages } from 'utils/previewImage'
import { BACKEND_URL } from 'constants/constants'
import { FashionItemInfo, PreviewImage } from 'types'

type UploadedImageIds = number[] | undefined

const EMPTY_FASHION_ITEM_INFO = { category: '', price: '', buyingPlace: '' }

const PostEdit = ({ snsPost, afterEditPost, children }) => {
  // TODO: map 함수 image 인자 타입 정의
  const initialPreviewImages: PreviewImage[] =
    snsPost.attributes.postImages.data.map((image: any) => ({
      url: BACKEND_URL + image.attributes.url,
      altText: image.attributes.alternativeText,
    }))
  const newEmptyFashionItemInfo = generateIdIntoObject(EMPTY_FASHION_ITEM_INFO)
  const initialFashionItemsInfo: FashionItemInfo[] = snsPost.attributes
    .fashionItemsInfo ?? [newEmptyFashionItemInfo]
  const initialPostText: string = snsPost.attributes.content

  const [imageFiles, setImageFiles] = useState<File[] | null>(null)
  const [previewImages, setPreviewImages] =
    useState<PreviewImage[]>(initialPreviewImages)
  const [fashionItemsInfo, setFashionItemsInfo] = useState<FashionItemInfo[]>(
    initialFashionItemsInfo
  )
  const [postText, setPostText] = useState(initialPostText)

  const handleImageFilesChange = (imageFiles: File[]) => {
    setImageFiles(imageFiles)
    const previewImagesFromImageFiles =
      changeImageFilesToPreviewImages(imageFiles)
    setPreviewImages(previewImagesFromImageFiles)
  }

  const handleFashionItemsInfoChange = (
    fashionItemsInfo: FashionItemInfo[]
  ) => {
    setFashionItemsInfo(fashionItemsInfo)
  }

  const handleFashionItemInfoAddMoreButtonClick = () => {
    setFashionItemsInfo(prev => {
      const newEmptyFashionItemInfo = generateIdIntoObject(
        EMPTY_FASHION_ITEM_INFO
      ) as FashionItemInfo
      return prev.concat(newEmptyFashionItemInfo)
    })
  }

  const handleFashionItemInfoDeleteButtonClick = (
    fashionItemInfoIdToDelete: number
  ) => {
    setFashionItemsInfo(prev => {
      return prev.filter(prev => prev.id !== fashionItemInfoIdToDelete)
    })
  }

  const handlePostTextChange = (postText: string) => {
    setPostText(postText)
  }

  const editSnsPost = async (uploadedImageIds: UploadedImageIds) => {
    return editPost({
      postId: snsPost.id,
      content: postText,
      imageIds: uploadedImageIds,
      fashionItemsInfo,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let uploadedImageIds: UploadedImageIds

    // TODO: map 함수 image 인자 타입 정의
    try {
      if (imageFiles) {
        const res = await uploadImage(imageFiles)
        uploadedImageIds = res.data.map((image: any) => image.id)
      }

      await editSnsPost(uploadedImageIds)
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
