import { css } from '@emotion/react'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'

const inputDisplayNone = css`
  display: none;
`

const ImageUploadButton = ({ onImageFilesChange }) => {
  return (
    <label htmlFor="post-image-upload">
      <input
        type="file"
        accept="image/*"
        id="post-image-upload"
        multiple
        css={inputDisplayNone}
        onChange={onImageFilesChange}
      />
      <IconButton
        color="primary"
        aria-label="포스트 사진 업로드"
        component="span"
      >
        <PhotoCamera />
      </IconButton>
    </label>
  )
}

export default ImageUploadButton
