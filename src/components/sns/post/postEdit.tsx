import { FormEvent, ReactNode, useState } from 'react'
import editPost from 'services/snsPost/editPost'
import uploadImage from 'services/upload/uploadImage'
import getObjectIncludedId from 'utils/getObjectIncludedId'
import { changeImageFilesToPreviewImages } from 'utils/previewImage'
import { Nullable } from 'types/common'
import { FashionItemInfo } from 'types/fashion'
import { Image, ImageFiles, UploadedImageId } from 'types/image'
import { SnsPostForEditing } from 'pages/sns/post/edit/[snsPostId]'

const EMPTY_FASHION_ITEM_INFO: Omit<FashionItemInfo, 'id'> = {
  category: '',
  price: null,
  buyingPlace: '',
}

const createNewEmptyFashionItemInfo = (): FashionItemInfo => {
  return getObjectIncludedId(EMPTY_FASHION_ITEM_INFO)
}
const emptyFashionItemInfo = createNewEmptyFashionItemInfo()

type ChildrenProps = {
  previewImages: Image[]
  fashionItemInfos: FashionItemInfo[]
  postText: Nullable<string>
  handleImageFilesChange: (imageFiles: FileList) => void
  handleFashionItemInfosChange: (fashionItemInfos: FashionItemInfo[]) => void
  handleFashionItemInfoAddMoreButtonClick: () => void
  handleFashionItemInfoDeleteButtonClick: (
    fashionItemInfoIdToDelete: number
  ) => void
  handlePostTextChange: (postText: string) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
}

type PostEditProps = {
  snsPost: SnsPostForEditing
  afterPostEdited: () => void
  children: (props: ChildrenProps) => ReactNode
}

const PostEdit = ({ snsPost, afterPostEdited, children }: PostEditProps) => {
  const [imageFiles, setImageFiles] = useState<ImageFiles>(null)
  const [previewImages, setPreviewImages] = useState(snsPost.postImages)
  const [fashionItemInfos, setFashionItemInfos] = useState(
    snsPost.fashionItemInfos ?? [emptyFashionItemInfo]
  )
  const [postText, setPostText] = useState(snsPost.postText)

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
      await editSnsPost()
      afterPostEdited()
    } catch (error) {
      console.error(error)
    }
  }

  const editSnsPost = async () => {
    const imageIds = await uploadPostImages()
    await editPost({
      postId: snsPost.id,
      content: postText,
      imageIds,
      fashionItemInfos: fashionItemInfos,
    })
  }

  const uploadPostImages = async (): Promise<UploadedImageId[] | undefined> => {
    if (!imageFiles) {
      return
    }
    const res = await uploadImage(imageFiles)
    const uploadedImageIds = res.data.map(image => image.id)
    return uploadedImageIds
  }

  return (
    <>
      {children({
        previewImages,
        fashionItemInfos: fashionItemInfos,
        postText,
        handleImageFilesChange,
        handleFashionItemInfosChange: handleFashionItemInfosChange,
        handleFashionItemInfoAddMoreButtonClick,
        handleFashionItemInfoDeleteButtonClick,
        handlePostTextChange,
        handleSubmit,
      })}
    </>
  )
}

export default PostEdit
