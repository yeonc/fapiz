import { useState } from 'react'
import { css } from '@emotion/react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import uploadImage from 'services/upload/uploadImage'
import createFashionItem from 'services/fashionItem/createFashionItem'
import useMe from 'hooks/useMe'
import { changeImageFileToPreviewImage } from 'utils/previewImage'
import {
  FASHION_ITEM_SEASONS,
  FASHION_ITEM_CATEGORIES,
  FASHION_ITEM_COLORS,
} from 'constants/fashionItem'
import { ImageFiles, PreviewImage } from 'types/image'

const previewImageStyle = css`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin: 10px 0;
  object-fit: cover;
`

const DEFAULT_PREVIEW_IMAGE = {
  url: '/default-preview.png',
  altText: '기본 프리뷰 이미지',
}

const FashionItemCreateForm = ({ afterCreateFashionItem }) => {
  const { me } = useMe()

  const [imageFiles, setImageFiles] = useState<ImageFiles>(null)
  const [previewImage, setPreviewImage] = useState<PreviewImage>(
    DEFAULT_PREVIEW_IMAGE
  )
  const [season, setSeason] = useState('')
  const [category, setCategory] = useState('')
  const [color, setColor] = useState('')

  const handleImageFilesChange = (imageFiles: FileList) => {
    setImageFiles(imageFiles)
    const previewImage = changeImageFileToPreviewImage(imageFiles[0])
    setPreviewImage(previewImage)
  }

  const handleSeasonChange = (season: any) => {
    setSeason(season)
  }

  const handleCategoryChange = (category: any) => {
    setCategory(category)
  }

  const handleColorChange = (color: any) => {
    setColor(color)
  }

  const createFashionItemWithImage = async (uploadedImageId: any) => {
    await createFashionItem({
      season,
      category,
      color,
      imageId: uploadedImageId,
      ownerId: me.id,
    })
  }

  const handleFashionItemSubmit = async (e: any) => {
    e.preventDefault()

    if (imageFiles === null) {
      alert('이미지를 첨부해 주세요!')
      return
    }

    // TODO: uploadedImageId 가져오는 과정 함수로 빼기
    try {
      const res = await uploadImage(imageFiles)
      const uploadedImageId = res.data[0].id
      await createFashionItemWithImage(uploadedImageId)
      afterCreateFashionItem()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleFashionItemSubmit}>
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
      <FormControl fullWidth>
        <InputLabel>계절</InputLabel>
        <Select
          value={season}
          label="계절"
          onChange={e => handleSeasonChange(e.target.value)}
          required
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
          required
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
          required
        >
          {FASHION_ITEM_COLORS.map(color => (
            <MenuItem key={color.id} value={color.name}>
              {color.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" type="submit">
        등록
      </Button>
    </form>
  )
}

export default FashionItemCreateForm
