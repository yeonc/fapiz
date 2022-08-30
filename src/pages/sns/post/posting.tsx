import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import PostWritingHeadingTypo from 'components/sns/post/postWritingHeadingTypo'
import PostWritingSubheadingTypo from 'components/sns/post/postWritingSubheadingTypo'
import FashionItemsInfo from 'components/sns/post/fashionItemsInfo'
import PostCreate from 'components/sns/post/postCreate'
import PostImageUploadCaptionTypo from 'components/sns/post/postImageUploadCaptionTypo'
import useMe from 'hooks/useMe'

const StyledSnsPostCreatePage = styled.div`
  padding: 30px 0;
`

const StyledPostImageWrapper = styled.section`
  margin-bottom: 22px;
`

const StyledPostFashionItemInfoWrapper = styled.section`
  margin-bottom: 22px;
`

const StyledPostDescriptionWrapper = styled.section`
  margin-bottom: 22px;
`

const StyledFashionItemsInfo = styled(FashionItemsInfo)`
  margin-bottom: 10px;
`

const previewImageSize = css`
  width: 33.33%;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  object-fit: cover;
`

const postSubmitButtonStyle = css`
  display: block;
  margin: 0 auto;
`

const SnsPostCreatePage = () => {
  const { me } = useMe()

  const router = useRouter()

  const goToSnsPost = (postId: number) => {
    router.push(`/sns/post/${postId}`)
  }

  const afterPostCreated = (createdPostId: number) => {
    goToSnsPost(createdPostId)
  }

  return (
    <PostCreate authorId={me?.id} afterPostCreated={afterPostCreated}>
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
        <StyledSnsPostCreatePage>
          <PostWritingHeadingTypo>게시물 등록</PostWritingHeadingTypo>
          <form onSubmit={handleSubmit}>
            <StyledPostImageWrapper>
              <PostWritingSubheadingTypo>
                게시물 이미지
              </PostWritingSubheadingTypo>
              {previewImages &&
                previewImages.map(previewImage => (
                  <img
                    key={previewImage.url}
                    src={previewImage.url}
                    alt={previewImage.altText}
                    css={previewImageSize}
                  />
                ))}
              <div>
                <ImageUploadButton
                  onImageFilesChange={handleImageFilesChange}
                  buttonAriaLabel="SNS 게시물 이미지 업로드"
                  isImageRequired={true}
                />
                <PostImageUploadCaptionTypo>
                  아이콘을 클릭해 이미지를 업로드 해 보세요! (세 장까지만 가능)
                </PostImageUploadCaptionTypo>
              </div>
            </StyledPostImageWrapper>
            <StyledPostFashionItemInfoWrapper>
              <PostWritingSubheadingTypo>
                착용한 패션 아이템 정보
              </PostWritingSubheadingTypo>
              <StyledFashionItemsInfo
                fashionItemsInfo={fashionItemsInfo}
                onFashionItemsInfoChange={handleFashionItemsInfoChange}
                onFashionItemInfoDeleteButtonClick={
                  handleFashionItemInfoDeleteButtonClick
                }
              />
              <Button
                variant="outlined"
                onClick={handleFashionItemInfoAddMoreButtonClick}
                size="small"
                startIcon={<AddIcon />}
              >
                아이템 정보 더 추가
              </Button>
            </StyledPostFashionItemInfoWrapper>
            <StyledPostDescriptionWrapper>
              <PostWritingSubheadingTypo>게시물 내용</PostWritingSubheadingTypo>
              <TextField
                multiline
                value={postText}
                onChange={e => handlePostTextChange(e.target.value)}
                fullWidth={true}
                minRows={3}
              />
            </StyledPostDescriptionWrapper>
            <Button
              variant="contained"
              type="submit"
              css={postSubmitButtonStyle}
            >
              등록
            </Button>
          </form>
        </StyledSnsPostCreatePage>
      )}
    </PostCreate>
  )
}

export default withHeader(SnsPostCreatePage)
