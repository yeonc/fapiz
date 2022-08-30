import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import { css } from '@emotion/react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import PostEdit from 'components/sns/post/postEdit'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import FashionItemsInfo from 'components/sns/post/fashionItemsInfo'
import useSnsPost from 'hooks/useSnsPost'

const postPreviewImagesSize = css`
  width: 200px;
`

const SnsPostEditPage = () => {
  const router = useRouter()
  const { snsPostId } = router.query

  const { snsPost } = useSnsPost(Number(snsPostId))

  const goToEditedPostPage = () => router.push(`/sns/post/${snsPostId}`)

  const afterPostEdited = () => {
    goToEditedPostPage()
  }

  if (!snsPost) {
    return null
  }

  return (
    <PostEdit snsPost={snsPost} afterPostEdited={afterPostEdited}>
      {({
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
            isImageRequired={false}
          />
          <FashionItemsInfo
            fashionItemsInfo={fashionItemsInfo}
            onFashionItemsInfoChange={handleFashionItemsInfoChange}
            onFashionItemInfoDeleteButtonClick={
              handleFashionItemInfoDeleteButtonClick
            }
          />
          <Button
            variant="contained"
            onClick={handleFashionItemInfoAddMoreButtonClick}
          >
            아이템 정보 더 추가
          </Button>
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
