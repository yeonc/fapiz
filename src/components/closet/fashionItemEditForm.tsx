import { FormEvent, useState } from 'react'
import { css } from '@emotion/react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import uploadImage from 'services/upload/uploadImage'
import editFashionItem from 'services/fashionItem/editFashionItem'
import deleteFashionItem from 'services/fashionItem/deleteFashionItem'
import { changeImageFileToPreviewImage } from 'utils/previewImage'
import { ImageFiles, PreviewImage } from 'types/image'

const previewImageStyle = css`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin: 10px 0;
  object-fit: cover;
`

type UploadedImageId = number | undefined

const FashionItemEditForm = ({
  initialFashionItem,
  afterEditFashionItem,
  afterDeleteFashionItem,
}) => {
  const [imageFiles, setImageFiles] = useState<ImageFiles>(null)
  const [previewImage, setPreviewImage] = useState<PreviewImage>(
    initialFashionItem.image
  )
  const [category, setCategory] = useState<string>(initialFashionItem.category)
  const [color, setColor] = useState<string>(initialFashionItem.color)

  const handleImageFilesChange = (imageFiles: FileList) => {
    setImageFiles(imageFiles)
    const previewImage = changeImageFileToPreviewImage(imageFiles[0])
    setPreviewImage(previewImage)
  }

  const handleCategoryChange = (category: string) => {
    setCategory(category)
  }

  const handleColorChange = (color: string) => {
    setColor(color)
  }

  const getUploadedImageId = async (): Promise<UploadedImageId> => {
    if (!imageFiles) {
      return
    }

    const res = await uploadImage(imageFiles)
    const uploadedImageId: number = res.data[0].id

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
      await editFashionItemInCloset()
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
    <form onSubmit={handleFashionItemEditButtonClick}>
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
      <TextField
        label="카테고리"
        value={category}
        onChange={e => handleCategoryChange(e.target.value)}
        required
      />
      <TextField
        label="색상"
        value={color}
        onChange={e => handleColorChange(e.target.value)}
        required
      />
      <Button variant="contained" type="submit">
        수정
      </Button>
      <Button
        variant="outlined"
        type="button"
        onClick={handleFashionItemDeleteButtonClick}
      >
        삭제
      </Button>
    </form>
  )
}

export default FashionItemEditForm
