import { FormEvent, useState } from 'react'
import editPost from 'services/snsPost/editPost'
import uploadImage from 'services/upload/uploadImage'
import generateIdIntoObject from 'utils/generateIdIntoObject'
import { changeImageFilesToPreviewImages } from 'utils/previewImage'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { Nullable, Obj, WithId } from 'types/common'
import { FashionItemInfo } from 'types/fashion'
import { Image, ImageFiles, UploadedImageId } from 'types/image'
import { SnsPostResponseAboutDefaultQuery } from 'types/snsPost'

const EMPTY_FASHION_ITEM_INFO = { category: '', price: null, buyingPlace: '' }

const createNewEmptyFashionItemInfo = (): WithId<Obj> => {
  return generateIdIntoObject(EMPTY_FASHION_ITEM_INFO)
}
const emptyFashionItemInfo = createNewEmptyFashionItemInfo() as FashionItemInfo

type ChildrenProps = {
  previewImages: Image[]
  fashionItemsInfo: FashionItemInfo[]
  postText: Nullable<string>
  handleImageFilesChange: (imageFiles: FileList) => void
  handleFashionItemsInfoChange: (fashionItemsInfo: FashionItemInfo[]) => void
  handleFashionItemInfoAddMoreButtonClick: () => void
  handleFashionItemInfoDeleteButtonClick: (
    fashionItemInfoIdToDelete: number
  ) => void
  handlePostTextChange: (postText: string) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
}

type PostEditProps = {
  snsPost: SnsPostResponseAboutDefaultQuery
  afterPostEdited: () => void
  children: (props: ChildrenProps) => EmotionJSX.Element
}

const PostEdit = ({ snsPost, afterPostEdited, children }: PostEditProps) => {
  const initialPreviewImages: Image[] = snsPost.attributes.postImages.data.map(
    image => ({
      url: image.attributes.url,
      altText: image.attributes.alternativeText,
    })
  )
  const initialFashionItemsInfo: FashionItemInfo[] = snsPost.attributes
    .fashionItemsInfo ?? [emptyFashionItemInfo]
  const initialPostText = snsPost.attributes.content

  const [imageFiles, setImageFiles] = useState<ImageFiles>(null)
  const [previewImages, setPreviewImages] = useState(initialPreviewImages)
  const [fashionItemsInfo, setFashionItemsInfo] = useState(
    initialFashionItemsInfo
  )
  const [postText, setPostText] = useState(initialPostText)

  const handleImageFilesChange = (imageFiles: FileList) => {
    setImageFiles(imageFiles)
    const previewImages = changeImageFilesToPreviewImages(imageFiles)
    setPreviewImages(previewImages)
  }

  const handleFashionItemsInfoChange = (
    fashionItemsInfo: FashionItemInfo[]
  ) => {
    setFashionItemsInfo(fashionItemsInfo)
  }

  const handleFashionItemInfoAddMoreButtonClick = () => {
    setFashionItemsInfo(prev => {
      const emptyFashionItemInfo =
        createNewEmptyFashionItemInfo() as FashionItemInfo
      return prev.concat(emptyFashionItemInfo)
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
    UploadedImageId[] | undefined
  > => {
    if (!imageFiles) {
      return
    }
    const res = await uploadImage(imageFiles)
    const uploadedImageIds = res.data.map(image => image.id)
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
    try {
      await editSnsPost()
      afterPostEdited()
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
