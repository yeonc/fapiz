import { FormEvent, useState } from 'react'
import editPost from 'services/users/editPost'
import uploadImage from 'services/users/uploadImage'
import generateIdIntoObject from 'utils/generateIdIntoObject'
import { changeImageFilesToPreviewImages } from 'utils/previewImage'
import { BACKEND_URL } from 'constants/constants'
import { FashionItemInfo, PreviewImage, ImageFiles } from 'types'

const EMPTY_FASHION_ITEM_INFO = { category: '', price: '', buyingPlace: '' }

type UploadedImageIds = number[]

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

  const [imageFiles, setImageFiles] = useState<ImageFiles>(null)
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

  const getUploadedImageIds = async (): Promise<
    UploadedImageIds | undefined
  > => {
    if (!imageFiles) {
      return
    }

    const res = await uploadImage(imageFiles)
    const uploadedImageIds: UploadedImageIds = res.data.map(
      (image: any) => image.id
    )

    return uploadedImageIds
  }

  const editSnsPost = async () => {
    const imageIds = await getUploadedImageIds()

    await editPost({
      postId: snsPost.id,
      content: postText,
      imageIds,
      fashionItemsInfo,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // TODO: map 함수 image 인자 타입 정의
    try {
      await editSnsPost()
      afterEditPost()
    } catch (error) {
      console.error(error)
    }
  }

  return children({
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
