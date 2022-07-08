import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import { css } from '@emotion/react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import FashionItemsInfo from 'components/sns/edit/fashionItemsInfo'
import createPost from 'services/users/createPost'
import uploadImage from 'services/users/uploadImage'
import useMe from 'hooks/useMe'
import { changeImageFilesToPreviewImages } from 'utils/previewImage'
import generateIdIntoObject from 'utils/generateIdIntoObject'
import { FashionItemInfo, PreviewImage } from 'types'

const postPreviewImagesSize = css`
  width: 200px;
`

const EMPTY_FASHION_ITEM_INFO = { category: '', price: '', buyingPlace: '' }

type ImageFiles = File[] | null
type PreviewImages = PreviewImage[] | null
type CreatedPostId = number

const SnsPostPostingPage = () => {
  const { me } = useMe()

  const router = useRouter()

  const newEmptyFashionItemInfo = generateIdIntoObject(
    EMPTY_FASHION_ITEM_INFO
  ) as FashionItemInfo

  const [imageFiles, setImageFiles] = useState<ImageFiles>(null)
  const [previewImages, setPreviewImages] = useState<PreviewImages>(null)
  const [fashionItemsInfo, setFashionItemsInfo] = useState<FashionItemInfo[]>([
    newEmptyFashionItemInfo,
  ])
  const [postText, setPostText] = useState<string>('')

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!imageFiles) return

    const createSnsPost = async (
      uploadedImageIds: number[]
    ): Promise<CreatedPostId> => {
      const res = await createPost({
        postText,
        fashionItemsInfo,
        authorId: me.id,
        postImageIds: uploadedImageIds,
      })

      const createdPostId: number = res.data.data.id
      return createdPostId
    }

    const goToSnsPost = (postId: number) => {
      router.push(`/sns/post/${postId}`)
    }

    const afterCreatePost = (createdPostId: number) => {
      goToSnsPost(createdPostId)
    }

    // TODO: map 함수 image 인자 타입 정의
    try {
      const res = await uploadImage(imageFiles)
      const uploadedImageIds: number[] = res.data.map((image: any) => image.id)
      const createdPostId = await createSnsPost(uploadedImageIds)
      afterCreatePost(createdPostId)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {previewImages &&
        previewImages.map((previewImage: PreviewImage) => (
          <img
            key={previewImage.url}
            src={previewImage.url}
            alt={previewImage.altText}
            css={postPreviewImagesSize}
          />
        ))}
      <ImageUploadButton
        onImageFilesChange={handleImageFilesChange}
        buttonAriaLabel="SNS 게시물 이미지 업로드"
      />
      <FashionItemsInfo
        fashionItemsInfo={fashionItemsInfo}
        onFashionItemsInfoChange={handleFashionItemsInfoChange}
        onFashionItemInfoAddMoreButtonClick={
          handleFashionItemInfoAddMoreButtonClick
        }
        onFashionItemInfoDeleteButtonClick={
          handleFashionItemInfoDeleteButtonClick
        }
      />
      <TextField
        label="글 내용을 작성해 주세요"
        multiline
        value={postText}
        onChange={e => handlePostTextChange(e.target.value)}
      />
      <Button variant="contained" type="submit">
        등록
      </Button>
    </form>
  )
}

export default withHeader(SnsPostPostingPage)
