import { FormEvent, ReactNode, useState } from 'react'
import createPost from 'services/snsPost/createPost'
import uploadImage from 'services/upload/uploadImage'
import { changeImageFilesToPreviewImages } from 'utils/previewImage'
import getObjectIncludedId from 'utils/getObjectIncludedId'
import { FashionItemInfo } from 'types/fashion'
import { ImageFiles, Image, UploadedImageId } from 'types/image'
import { Id } from 'types/common'

const EMPTY_FASHION_ITEM_INFO: Omit<FashionItemInfo, 'id'> = {
  category: '',
  price: null,
  buyingPlace: '',
}

const createNewEmptyFashionItemInfo = (): FashionItemInfo => {
  return getObjectIncludedId(EMPTY_FASHION_ITEM_INFO)
}
const emptyFashionItemInfo = createNewEmptyFashionItemInfo()

type CreatedPostId = Id

type ChildrenProps = {
  previewImages: Image[] | null
  fashionItemInfos: FashionItemInfo[]
  postText: string
  handleImageFilesChange: (imageFiles: FileList) => void
  handleFashionItemInfosChange: (fashionItemInfos: FashionItemInfo[]) => void
  handleFashionItemInfoAddMoreButtonClick: () => void
  handleFashionItemInfoDeleteButtonClick: (
    fashionItemInfoIdToDelete: number
  ) => void
  handlePostTextChange: (postText: string) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
}

type PostCreateProps = {
  authorId: Id
  afterPostCreated: (createdPostId: Id) => void
  children: (props: ChildrenProps) => ReactNode
}

const PostCreate = ({
  authorId,
  afterPostCreated,
  children,
}: PostCreateProps) => {
  const [imageFiles, setImageFiles] = useState<ImageFiles>(null)
  const [previewImages, setPreviewImages] = useState<Image[] | null>(null)
  const [fashionItemInfos, setFashionItemInfos] = useState<FashionItemInfo[]>([
    emptyFashionItemInfo,
  ])
  const [postText, setPostText] = useState('')

  const handleImageFilesChange = (imageFiles: FileList) => {
    setImageFiles(imageFiles)
    const previewImages = changeImageFilesToPreviewImages(imageFiles)
    setPreviewImages(previewImages)
  }

  const handleFashionItemInfosChange = (
    fashionItemInfos: FashionItemInfo[]
  ) => {
    setFashionItemInfos(fashionItemInfos)
  }

  const handleFashionItemInfoAddMoreButtonClick = () => {
    setFashionItemInfos(prev => {
      const emptyFashionItemInfo = createNewEmptyFashionItemInfo()
      return [...prev, emptyFashionItemInfo]
    })
  }

  const handleFashionItemInfoDeleteButtonClick = (
    fashionItemInfoIdToDelete: number
  ) => {
    setFashionItemInfos(prev => {
      return prev.filter(prev => prev.id !== fashionItemInfoIdToDelete)
    })
  }

  const handlePostTextChange = (postText: string) => {
    setPostText(postText)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const createdPostId = await createSnsPost()
      afterPostCreated(createdPostId)
    } catch (error) {
      console.error(error)
    }
  }

  const createSnsPost = async (): Promise<CreatedPostId> => {
    const imageIds = await uploadPostImages()
    const res = await createPost({
      postText,
      fashionItemInfos: fashionItemInfos,
      authorId,
      postImageIds: imageIds,
    })
    const createdPostId = res.data.data.id
    return createdPostId
  }

  const uploadPostImages = async (): Promise<UploadedImageId[]> => {
    const res = await uploadImage(imageFiles!)
    const uploadedImageIds = res.data.map(image => image.id)
    return uploadedImageIds
  }

  return (
    <>
      {children({
        previewImages,
        fashionItemInfos,
        postText,
        handleImageFilesChange,
        handleFashionItemInfosChange,
        handleFashionItemInfoAddMoreButtonClick,
        handleFashionItemInfoDeleteButtonClick,
        handlePostTextChange,
        handleSubmit,
      })}
    </>
  )
}

export default PostCreate
