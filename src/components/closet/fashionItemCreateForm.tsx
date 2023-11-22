import { useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import ImageUploadCaptionTypo from 'components/common/typo/imageUploadCaptionTypo'
import uploadImage from 'services/upload/uploadImage'
import createFashionItem from 'services/fashionItem/createFashionItem'
import useMe from 'hooks/useMe'
import { changeImageFileToPreviewImage } from 'utils/previewImage'
import { ImageFiles, Image } from 'types/image'
import { mgBottom } from 'styles/layout'
import { User } from 'types/user'

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

const DEFAULT_PREVIEW_IMAGE = {
  url: '/default-preview.png',
  altText: '기본 프리뷰 이미지',
}

const FashionItemCreateForm = ({ afterCreateFashionItem }) => {
  const { me } = useMe<User>()
  const [imageFiles, setImageFiles] = useState<ImageFiles>(null)
  const [previewImage, setPreviewImage] = useState<Image>(DEFAULT_PREVIEW_IMAGE)
  const [category, setCategory] = useState('')
  const [color, setColor] = useState('')
  const [isFashionItemCreateLoading, setIsFashionItemCreateLoading] =
    useState(false)

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
      ownerId: me && me.id,
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
      setIsFashionItemCreateLoading(true)
      const res = await uploadImage(imageFiles)
      const uploadedImageId = res.data[0].id
      await createFashionItemWithImage(uploadedImageId)
      setIsFashionItemCreateLoading(false)
      afterCreateFashionItem()
    } catch (error) {
      console.error(error)
    }
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
