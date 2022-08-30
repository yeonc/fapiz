import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import { css } from '@emotion/react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import FashionItemsInfo from 'components/sns/post/fashionItemsInfo'
import PostCreate from 'components/sns/post/postCreate'
import useMe from 'hooks/useMe'

const postPreviewImagesSize = css`
  width: 200px;
`

const SnsPostCreatePage = () => {
  const { me } = useMe()

  const router = useRouter()

  const goToSnsPost = (postId: number) => {
    router.push(`/sns/post/${postId}`)
  }

  const afterCreatePost = (createdPostId: number) => {
    goToSnsPost(createdPostId)
  }

  return (
    <PostCreate authorId={me?.id} afterCreatePost={afterCreatePost}>
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
          {previewImages &&
            previewImages.map(previewImage => (
              <img
                key={previewImage.url}
                src={previewImage.url}
                alt={previewImage.altText}
                css={postPreviewImagesSize}
              />
            ))}
          <ImageUploadButton
            onImageFilesChange={handleImageFilesChange}
            buttonAriaLabel="SNS 게시물 이미지 업로드"
            isImageRequired={true}
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
            등록
          </Button>
        </form>
      )}
    </PostCreate>
  )
}

export default withHeader(SnsPostCreatePage)
