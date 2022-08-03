import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import { css } from '@emotion/react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import FashionItemsInfo from 'components/sns/edit/fashionItemsInfo'
import CreatePost from 'components/sns/createPost'
import useMe from 'hooks/useMe'
import { PreviewImage } from 'types/image'

const postPreviewImagesSize = css`
  width: 200px;
`

const SnsPostCreatingPage = () => {
  const { me } = useMe()

  const router = useRouter()

  const goToSnsPost = (postId: number) => {
    router.push(`/sns/post/${postId}`)
  }

  const afterCreatePost = (createdPostId: number) => {
    goToSnsPost(createdPostId)
  }

  return (
    <CreatePost authorId={me?.id} afterCreatePost={afterCreatePost}>
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
            previewImages.map((previewImage: PreviewImage) => (
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
            등록
          </Button>
        </form>
      )}
    </CreatePost>
  )
}

export default withHeader(SnsPostCreatingPage)
