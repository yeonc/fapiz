import { css } from '@emotion/react'

const postPreviewImagesSize = css`
  width: 200px;
`

const PostImages = ({ previewImages, imageUploadButton }) => (
  <>
    {previewImages.map(previewImage => (
      <img
        key={previewImage.url}
        src={previewImage.url}
        alt={previewImage.altText}
        css={postPreviewImagesSize}
      />
    ))}
    {imageUploadButton}
  </>
)

export default PostImages
