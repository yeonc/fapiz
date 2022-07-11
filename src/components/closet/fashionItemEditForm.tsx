import { useState } from 'react'
import { css } from '@emotion/react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import uploadImage from 'services/users/uploadImage'
import editFashionItem from 'services/users/editFashionItem'
import deleteFashionItem from 'services/users/deleteFashionItem'
import { changeImageFileToPreviewImage } from 'utils/previewImage'
import {
  FASHION_ITEM_SEASONS,
  FASHION_ITEM_CATEGORIES,
  FASHION_ITEM_COLORS,
} from 'constants/fashionItem'
import { ImageFiles, PreviewImage } from 'types'

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
  const [season, setSeason] = useState<string>(initialFashionItem.season)
  const [category, setCategory] = useState<string>(initialFashionItem.category)
  const [color, setColor] = useState<string>(initialFashionItem.color)

  const handleImageFilesChange = (imageFiles: File[]) => {
    setImageFiles(imageFiles)
    const previewImage = changeImageFileToPreviewImage(imageFiles[0])
    setPreviewImage(previewImage)
  }

  const handleSeasonChange = (season: string) => {
    setSeason(season)
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
      season,
      category,
      color,
      imageId,
    })
  }

  const handleFashionItemEditButtonClick = async () => {
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
    <form>
      <img
        src={previewImage.url}
        alt={previewImage.altText}
        css={previewImageStyle}
      />
      <ImageUploadButton
        onImageFilesChange={handleImageFilesChange}
        buttonAriaLabel="패션 아이템 이미지 선택"
      />
      <FormControl fullWidth>
        <InputLabel>계절</InputLabel>
        <Select
          value={season}
          label="계절"
          onChange={e => handleSeasonChange(e.target.value)}
        >
          {FASHION_ITEM_SEASONS.map(season => (
            <MenuItem key={season.id} value={season.name}>
              {season.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>카테고리</InputLabel>
        <Select
          value={category}
          label="카테고리"
          onChange={e => handleCategoryChange(e.target.value)}
        >
          {FASHION_ITEM_CATEGORIES.map(category => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>색상</InputLabel>
        <Select
          value={color}
          label="색상"
          onChange={e => handleColorChange(e.target.value)}
        >
          {FASHION_ITEM_COLORS.map(color => (
            <MenuItem key={color.id} value={color.name}>
              {color.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        type="button"
        onClick={handleFashionItemEditButtonClick}
      >
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
