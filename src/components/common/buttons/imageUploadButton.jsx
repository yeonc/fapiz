import { css } from '@emotion/react'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import { useState } from 'react'

const inputDisplayNone = css`
  display: none;
`

const ImageUploadButton = ({ onImageFilesChange, buttonAriaLabel }) => {
  const [isInvalid, setIsInvalid] = useState(false)

  const handleInvalid = () => {
    setIsInvalid(true)
  }

  return (
    <label>
      <input
        type="file"
        accept="image/*"
        multiple
        required
        onInvalid={handleInvalid}
        css={inputDisplayNone}
        onChange={e => onImageFilesChange(e.target.files)}
      />
      <IconButton color="primary" aria-label={buttonAriaLabel} component="span">
        <PhotoCamera />
      </IconButton>
      {isInvalid && <p>이미지 파일이 첨부되지 않았습니다.</p>}
    </label>
  )
}

export default ImageUploadButton
