import { FormEvent, useState } from 'react'
import createPost from 'services/snsPost/createPost'
import uploadImage from 'services/upload/uploadImage'
import { changeImageFilesToPreviewImages } from 'utils/previewImage'
import generateIdIntoObject from 'utils/generateIdIntoObject'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { Obj, WithId } from 'types/common'
import { FashionItemInfo } from 'types/fashion'
import { ImageFiles, PreviewImage } from 'types/image'

const EMPTY_FASHION_ITEM_INFO = { category: '', price: 0, buyingPlace: '' }

const createNewEmptyFashionItemInfo = (): WithId<Obj> => {
  return generateIdIntoObject(EMPTY_FASHION_ITEM_INFO)
}
const emptyFashionItemInfo = createNewEmptyFashionItemInfo() as FashionItemInfo

type CreatedPostId = number

type ChildrenProps = {
  previewImages: PreviewImage[] | null
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

type PostCreateProps = {
  authorId: number
  afterPostCreated: (createdPostId: number) => void
  children: (props: ChildrenProps) => EmotionJSX.Element
}

const PostCreate = ({
  authorId,
  afterPostCreated,
  children,
}: PostCreateProps) => {
  const [imageFiles, setImageFiles] = useState<ImageFiles>(null)
  const [previewImages, setPreviewImages] = useState<PreviewImage[] | null>(
    null
  )
  const [fashionItemsInfo, setFashionItemsInfo] = useState<FashionItemInfo[]>([
    emptyFashionItemInfo,
  ])
  const [postText, setPostText] = useState('')

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

  const getUploadedImageIds = async (): Promise<number[]> => {
    // TODO: map 함수 image 인자 타입 정의
    const res = await uploadImage(imageFiles as FileList)
    const uploadedImageIds: number[] = res.data.map((image: any) => image.id)
    return uploadedImageIds
  }

  const createSnsPost = async (): Promise<CreatedPostId> => {
    const uploadedImageIds = await getUploadedImageIds()

    const res = await createPost({
      postText,
      fashionItemsInfo,
      authorId,
      postImageIds: uploadedImageIds,
    })

    const createdPostId: number = res.data.data.id
    return createdPostId
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // TODO: map 함수 image 인자 타입 정의
    try {
      const createdPostId = await createSnsPost()
      afterPostCreated(createdPostId)
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

export default PostCreate
