import { FormEvent, useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'
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

  const handleImageFilesChange = (imageFiles: FileList) => {
    setImageFiles(imageFiles)
    const previewImage = changeImageFileToPreviewImage(imageFiles[0])
    setPreviewImage(previewImage)
  }
  const handleCategoryChange = (category: string) => setCategory(category)
  const handleColorChange = (color: string) => setColor(color)
  const getUploadedImageId = async (): Promise<UploadedImageId | undefined> => {
    if (!imageFiles) {
      return
    }
    const res = await uploadImage(imageFiles)
    const uploadedImageId = res.data[0].id
    return uploadedImageId
  }
  const editFashionItemInCloset = async () => {
    const imageId = await getUploadedImageId()
    await editFashionItem({
      fashionItemId: initialFashionItem.id,
      category,
      color,
      imageId,
    })
  }
  const handleFashionItemEditButtonClick = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    try {
      setIsFashionItemEditLoading(true)
      await editFashionItemInCloset()
      setIsFashionItemEditLoading(false)
      afterEditFashionItem()
    } catch (error) {
      console.error(error)
    }
  }
  const handleFashionItemDeleteButtonClick = async () => {
    const isFashionItemDelete =
      window.confirm('패션 아이템을 삭제하시겠습니까?')
    if (!isFashionItemDelete) {
      return
    }
    try {
      await deleteFashionItem(initialFashionItem.id)
      afterDeleteFashionItem()
    } catch (error) {
      console.error(error)
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
      <LoadingButton
        variant="contained"
        type="submit"
        css={mgRight(6)}
        loading={isFashionItemEditLoading}
        loadingPosition="center"
      >
        수정
      </LoadingButton>
      <Button
        variant="outlined"
        type="button"
        onClick={handleFashionItemDeleteButtonClick}
        disabled={isFashionItemEditLoading}
      >
        삭제
      </Button>
    </StyledFashionItemCreateForm>
  )
}

export default FashionItemEditForm
