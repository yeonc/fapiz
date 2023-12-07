import { FormEvent, useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import ImageUploadCaptionTypo from 'components/common/typo/imageUploadCaptionTypo'
import uploadImage from 'services/upload/uploadImage'
import editFashionItem from 'services/fashionItem/editFashionItem'
import deleteFashionItem from 'services/fashionItem/deleteFashionItem'
import { changeImageFileToPreviewImage } from 'utils/previewImage'
import { ImageFiles, Image, UploadedImageId } from 'types/image'
import { mgBottom, mgRight } from 'styles/layout'
import { FashionItemForCloset } from 'pages/closet'
import ErrorMessage, { ErrorType } from 'components/common/texts/ErrorMessage'
import useError from 'hooks/useError'
import { ERROR_MESSAGE_TIMEOUT_SEC } from 'constants/common'

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

type FashionItemEditFormProps = {
  initialFashionItem: FashionItemForCloset
  afterEditFashionItem: () => void
  afterDeleteFashionItem: () => void
}

const FashionItemEditForm = ({
  initialFashionItem,
  afterEditFashionItem,
  afterDeleteFashionItem,
}: FashionItemEditFormProps) => {
  const [imageFiles, setImageFiles] = useState<ImageFiles>(null)
  const [previewImage, setPreviewImage] = useState<Image>(
    initialFashionItem.image
  )
  const [category, setCategory] = useState<string>(initialFashionItem.category)
  const [color, setColor] = useState<string>(initialFashionItem.color)
  const [isFashionItemEditLoading, setIsFashionItemEditLoading] =
    useState(false)
  const [isFashionItemDeleteLoading, setIsFashionItemDeleteLoading] =
    useState(false)
  const { error, handleError } = useError<ErrorType>()

  const handleImageFilesChange = (imageFiles: FileList) => {
    setImageFiles(imageFiles)
    const previewImage = changeImageFileToPreviewImage(imageFiles[0])
    setPreviewImage(previewImage)
  }

  const handleCategoryChange = (category: string) => setCategory(category)

  const handleColorChange = (color: string) => setColor(color)

  const handleFashionItemEditButtonClick = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    setIsFashionItemEditLoading(true)
    try {
      await editFashionItemInCloset()
      afterEditFashionItem()
    } catch {
      handleError('fasionItemEditError', ERROR_MESSAGE_TIMEOUT_SEC)
    } finally {
      setIsFashionItemEditLoading(false)
    }
  }

  const editFashionItemInCloset = async () => {
    const imageId = await uploadFashionItemImage()
    await editFashionItem({
      fashionItemId: initialFashionItem.id,
      category,
      color,
      imageId,
    })
  }

  const uploadFashionItemImage = async (): Promise<
    UploadedImageId | undefined
  > => {
    if (!imageFiles) {
      return
    }
    const res = await uploadImage(imageFiles)
    const uploadedImageId = res.data[0].id
    return uploadedImageId
  }

  const handleFashionItemDeleteButtonClick = async () => {
    const willFashionItemBeDeleted =
      window.confirm('패션 아이템을 삭제하시겠습니까?')
    if (!willFashionItemBeDeleted) {
      return
    }
    setIsFashionItemDeleteLoading(true)
    try {
      await deleteFashionItem(initialFashionItem.id)
      afterDeleteFashionItem()
    } catch {
      handleError('fashionItemDeleteError', ERROR_MESSAGE_TIMEOUT_SEC)
    } finally {
      setIsFashionItemDeleteLoading(false)
    }
  }

  return (
    <StyledFashionItemCreateForm onSubmit={handleFashionItemEditButtonClick}>
      <img
        src={previewImage.url}
        alt={previewImage.altText}
        css={previewImageStyle}
      />
      <ImageUploadButton
        onImageFilesChange={handleImageFilesChange}
        buttonAriaLabel="패션 아이템 이미지 선택"
        isImageRequired={false}
      />
      <ImageUploadCaptionTypo>
        아이콘을 클릭해 패션 아이템 이미지를 수정해 보세요!
      </ImageUploadCaptionTypo>
      <StyledTextFieldWrapper>
        <TextField
          label="카테고리"
          value={category}
          onChange={e => handleCategoryChange(e.target.value)}
          required
          fullWidth={true}
          css={mgBottom(12)}
        />
        <TextField
          label="색상"
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
        css={mgRight(6)}
        loading={isFashionItemEditLoading}
        loadingPosition="center"
        disabled={isFashionItemDeleteLoading}
      >
        수정
      </LoadingButton>
      <LoadingButton
        variant="outlined"
        type="button"
        loading={isFashionItemDeleteLoading}
        loadingPosition="center"
        disabled={isFashionItemEditLoading}
        onClick={handleFashionItemDeleteButtonClick}
      >
        삭제
      </LoadingButton>
    </StyledFashionItemCreateForm>
  )
}

export default FashionItemEditForm
