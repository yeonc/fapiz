import { FormEvent, useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import ImageUploadCaptionTypo from 'components/common/typo/imageUploadCaptionTypo'
import uploadImage from 'services/upload/uploadImage'
import createFashionItem from 'services/fashionItem/createFashionItem'
import { changeImageFileToPreviewImage } from 'utils/previewImage'
import { ImageFiles, Image, UploadedImageId } from 'types/image'
import { mgBottom } from 'styles/layout'
import { useAuth } from 'context/AuthContext'
import ErrorMessage from 'components/common/texts/ErrorMessage'
import useError from 'hooks/useError'
import { ERROR_MESSAGE_TIMEOUT_SEC } from 'constants/common'

const DEFAULT_PREVIEW_IMAGE = {
  url: '/images/default-preview.png',
  altText: '기본 프리뷰 이미지',
}

const StyledFashionItemCreateForm = styled.form`
  text-align: center;
`

const StyledTextFieldWrapper = styled.div`
  padding: 12px 12px 18px;
`

const previewImageStyle = css`
  display: block;
  width: 200px;
  border-radius: 50%;
  margin: 10px auto;
  object-fit: cover;
  aspect-ratio: 1 / 1;
`

const FashionItemCreateForm = ({
  afterCreateFashionItem,
}: {
  afterCreateFashionItem: () => void
}) => {
  const { me } = useAuth()
  const [imageFiles, setImageFiles] = useState<ImageFiles>(null)
  const [previewImage, setPreviewImage] = useState<Image>(DEFAULT_PREVIEW_IMAGE)
  const [category, setCategory] = useState('')
  const [color, setColor] = useState('')
  const [isFashionItemCreateLoading, setIsFashionItemCreateLoading] =
    useState(false)
  const { error, handleError } = useError()

  const handleImageFilesChange = (imageFiles: FileList) => {
    setImageFiles(imageFiles)
    const previewImage = changeImageFileToPreviewImage(imageFiles[0])
    setPreviewImage(previewImage)
  }

  const handleCategoryChange = (category: string) => setCategory(category)

  const handleColorChange = (color: string) => setColor(color)

  const handleFashionItemSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsFashionItemCreateLoading(true)
    try {
      await createFashionItemInCloset()
      afterCreateFashionItem()
    } catch {
      handleError('fashionItemCreateError', ERROR_MESSAGE_TIMEOUT_SEC)
    } finally {
      setIsFashionItemCreateLoading(false)
    }
  }

  const createFashionItemInCloset = async () => {
    if (!me) {
      throw new Error('로그인 상태가 아닙니다.')
    }
    const imageId = await uploadFashionItemImage()
    await createFashionItem({
      category,
      color,
      imageId: imageId,
      ownerId: me.id,
    })
  }

  const uploadFashionItemImage = async (): Promise<UploadedImageId> => {
    const res = await uploadImage(imageFiles!)
    const uploadedImageId = res.data[0].id
    return uploadedImageId
  }

  return (
    <StyledFashionItemCreateForm onSubmit={handleFashionItemSubmit}>
      <img
        src={previewImage.url}
        alt={previewImage.altText}
        css={previewImageStyle}
      />
      <ImageUploadButton
        onImageFilesChange={handleImageFilesChange}
        buttonAriaLabel="패션 아이템 이미지 선택"
        isImageRequired={true}
      />
      <ImageUploadCaptionTypo>
        아이콘을 클릭해 패션 아이템 이미지를 업로드 해 보세요!
      </ImageUploadCaptionTypo>
      <StyledTextFieldWrapper>
        <TextField
          label="카테고리를 입력하세요"
          value={category}
          onChange={e => handleCategoryChange(e.target.value)}
          required
          fullWidth={true}
          css={mgBottom(12)}
        />
        <TextField
          label="색상을 입력하세요"
          value={color}
          onChange={e => handleColorChange(e.target.value)}
          required
          fullWidth={true}
        />
      </StyledTextFieldWrapper>
      {error && <ErrorMessage type={error} />}
      <LoadingButton
        variant="contained"
        type="submit"
        loading={isFashionItemCreateLoading}
        loadingPosition="center"
      >
        등록
      </LoadingButton>
    </StyledFashionItemCreateForm>
  )
}

export default FashionItemCreateForm
