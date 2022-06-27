import { useState } from 'react'
import { css } from '@emotion/react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import { SEASONS, CATEGORIES, COLORS } from 'constants/fashionItemFeatures'

const previewImageStyle = css`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin: 10px 0;
  object-fit: cover;
`

const FashionItemEditForm = ({ initialFashionItem }) => {
  const [imageFiles, setImageFiles] = useState(null)
  const [previewImage, setPreviewImage] = useState(initialFashionItem.image)
  const [season, setSeason] = useState(initialFashionItem.season)
  const [category, setCategory] = useState(initialFashionItem.category)
  const [color, setColor] = useState(initialFashionItem.color)

  const handleImageFilesChange = imageFiles => {
    setImageFiles(imageFiles)
  }

  const handleSeasonChange = season => {
    setSeason(season)
  }

  const handleCategoryChange = category => {
    setCategory(category)
  }

  const handleColorChange = color => {
    setColor(color)
  }

  const handleFashionItemSubmit = e => {
    e.preventDefault()
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
      />
      <FormControl fullWidth>
        <InputLabel>계절</InputLabel>
        <Select
          value={season}
          label="계절"
          onChange={e => handleSeasonChange(e.target.value)}
        >
          {SEASONS.map(season => (
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
          {CATEGORIES.map(category => (
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
          {COLORS.map(color => (
            <MenuItem key={color.id} value={color.name}>
              {color.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" type="submit">
        수정
      </Button>
      <Button variant="outlined" type="submit">
        삭제
      </Button>
    </form>
  )
}

export default FashionItemEditForm
