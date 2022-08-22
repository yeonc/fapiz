import { FormEvent, useState } from 'react'
import editPost from 'services/snsPost/editPost'
import uploadImage from 'services/upload/uploadImage'
import generateIdIntoObject from 'utils/generateIdIntoObject'
import { changeImageFilesToPreviewImages } from 'utils/previewImage'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { Obj, WithId } from 'types/common'
import { FashionItemInfo } from 'types/fashion'
import { PreviewImage, ImageFiles } from 'types/image'

const EMPTY_FASHION_ITEM_INFO = { category: '', price: 0, buyingPlace: '' }

const createNewEmptyFashionItemInfo = (): WithId<Obj> => {
  return generateIdIntoObject(EMPTY_FASHION_ITEM_INFO)
}
const emptyFashionItemInfo = createNewEmptyFashionItemInfo() as FashionItemInfo

type UploadedImageIds = number[]

type ChildrenProps = {
  previewImages: PreviewImage[]
  fashionItemsInfo: FashionItemInfo[]
  postText: string
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
  snsPost: any
  afterEditPost: () => void
  children: (props: ChildrenProps) => EmotionJSX.Element
}

const PostEdit = ({ snsPost, afterEditPost, children }: PostEditProps) => {
  // TODO: map 함수 image 인자 타입 정의
  const initialPreviewImages: PreviewImage[] =
    snsPost.attributes.postImages.data.map((image: any) => ({
      url: image.attributes.url,
      altText: image.attributes.alternativeText,
    }))
  const initialFashionItemsInfo: FashionItemInfo[] = snsPost.attributes
    .fashionItemsInfo ?? [emptyFashionItemInfo]
  const initialPostText: string = snsPost.attributes.content

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
    UploadedImageIds | undefined
  > => {
    if (!imageFiles) {
      return
    }

    // TODO: map 함수 image 인자 타입 정의
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
