import { css } from '@emotion/react'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'

const inputDisplayNone = css`
  display: none;
`

const ImageUploadButton = ({ onImageFilesChange, buttonAriaLabel }) => {
  return (
    <label>
      <input
        type="file"
        accept="image/*"
        multiple
        css={inputDisplayNone}
        onChange={onImageFilesChange}
      />
      <IconButton color="primary" aria-label={buttonAriaLabel} component="span">
        <PhotoCamera />
      </IconButton>
    </label>
  )
}

export default ImageUploadButton
