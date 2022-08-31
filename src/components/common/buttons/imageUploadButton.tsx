import { useState } from 'react'
import { css } from '@emotion/react'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Typo from 'components/common/typo'
import { DEFAULT_RED } from 'styles/constants/color'

const inputDisplayNone = css`
  display: none;
`

const invaildTextStyle = css`
  color: ${DEFAULT_RED};
`

type ImageUploadButtonProps = {
  onImageFilesChange: (imageFiles: FileList) => void
  buttonAriaLabel: string
  isImageRequired: boolean
}

const ImageUploadButton = ({
  onImageFilesChange,
  buttonAriaLabel,
  isImageRequired,
}: ImageUploadButtonProps) => {
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
        required={isImageRequired}
        onInvalid={handleInvalid}
        css={inputDisplayNone}
        onChange={e => onImageFilesChange(e.target.files as FileList)}
      />
      <IconButton color="primary" aria-label={buttonAriaLabel} component="span">
        <PhotoCamera />
      </IconButton>
      {isInvalid && (
        <Typo css={invaildTextStyle}>이미지 파일이 첨부되지 않았습니다.</Typo>
      )}
    </label>
  )
}

export default ImageUploadButton
