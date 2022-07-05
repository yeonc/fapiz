import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import { css } from '@emotion/react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import PostEdit from 'components/sns/edit/postEdit'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import FashionItemsInfo from 'components/sns/edit/fashionItemsInfo'
import useSnsPost from 'hooks/useSnsPost'

const postPreviewImagesSize = css`
  width: 200px;
`

const SnsPostEditPage = () => {
  const router = useRouter()
  const { snsPostId } = router.query

  const { snsPost } = useSnsPost(snsPostId)

  const afterEditPost = () => {
    router.push(`/sns/post/${snsPostId}`)
  }

  if (!snsPost) {
    return null
  }

  return (
    <PostEdit snsPost={snsPost} afterEditPost={afterEditPost}>
      {({
        imageFiles,
        previewImages,
        fashionItemsInfo,
        postText,
        handleImageFilesChange,
        handleFashionItemsInfoChange,
        handleFashionItemInfoAddMoreButtonClick,
        handleFashionItemInfoDeleteButtonClick,
        handlePostTextChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          {previewImages.map(previewImage => (
            <img
              key={previewImage.url}
              src={previewImage.url}
              alt={previewImage.altText}
              css={postPreviewImagesSize}
            />
          ))}
          <ImageUploadButton
            onImageFilesChange={handleImageFilesChange}
            buttonAriaLabel="SNS 게시물 이미지 수정"
          />
          <FashionItemsInfo
            fashionItemsInfo={fashionItemsInfo}
            onFashionItemsInfoChange={handleFashionItemsInfoChange}
            onFashionItemInfoAddMoreButtonClick={
              handleFashionItemInfoAddMoreButtonClick
            }
            onFashionItemInfoDeleteButtonClick={
              handleFashionItemInfoDeleteButtonClick
            }
          />
          <TextField
            label="글 내용을 작성해 주세요"
            multiline
            value={postText}
            onChange={e => handlePostTextChange(e.target.value)}
          />
          <Button variant="contained" type="submit">
            수정
          </Button>
        </form>
      )}
    </PostEdit>
  )
}

export default withHeader(SnsPostEditPage)
