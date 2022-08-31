import { useState } from 'react'
import { css } from '@emotion/react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import uploadImage from 'services/upload/uploadImage'
import createFashionItem from 'services/fashionItem/createFashionItem'
import useMe from 'hooks/useMe'
import { changeImageFileToPreviewImage } from 'utils/previewImage'
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
  const [category, setCategory] = useState('')
  const [color, setColor] = useState('')

  const handleImageFilesChange = (imageFiles: FileList) => {
    setImageFiles(imageFiles)
    const previewImage = changeImageFileToPreviewImage(imageFiles[0])
    setPreviewImage(previewImage)
  }

  const handleCategoryChange = (category: any) => {
    setCategory(category)
  }

  const handleColorChange = (color: any) => {
    setColor(color)
  }

  const createFashionItemWithImage = async (uploadedImageId: any) => {
    await createFashionItem({
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
      <TextField
        label="카테고리를 입력하세요"
        value={category}
        onChange={e => handleCategoryChange(e.target.value)}
        required
      />
      <TextField
        label="색상을 입력하세요"
        value={color}
        onChange={e => handleColorChange(e.target.value)}
        required
      />
      <Button variant="contained" type="submit">
        등록
      </Button>
    </form>
  )
}

export default FashionItemCreateForm
