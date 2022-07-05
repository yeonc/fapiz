import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import Button from '@mui/material/Button'
import PostEdit from 'components/sns/edit/postEdit'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import PostImages from 'components/sns/edit/postImages'
import FashionItemsInfo from 'components/sns/edit/fashionItemsInfo'
import PostText from 'components/sns/edit/postText'
import useSnsPost from 'hooks/useSnsPost'

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
          <PostImages
            imageFiles={imageFiles}
            previewImages={previewImages}
            onImageFilesChange={handleImageFilesChange}
            imageUploadButton={
              <ImageUploadButton
                onImageFilesChange={handleImageFilesChange}
                buttonAriaLabel="SNS 게시물 이미지 수정"
              />
            }
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
          <PostText
            postText={postText}
            onPostTextChange={handlePostTextChange}
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
