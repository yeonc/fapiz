import { ReactNode, useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import MobileStepper from '@mui/material/MobileStepper'
import IconButton from '@mui/material/IconButton'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import PostAuthorHeader from 'components/sns/post/postAuthorHeader'
import AdditionalContentShowingToggleButton from 'components/sns/post/additionalContentShowingToggleButton'
import Typo from 'components/common/typo'
import getFormattedDate from 'utils/getFormattedDate'
import { Image } from 'types/image'
import { DEFAULT_GRAY, LIGHT_GRAY } from 'styles/constants/color'
import visuallyHidden from 'styles/visuallyHidden'
import { FashionItemInfo } from 'types/fashion'
import { SnsPostAuthorForPostDetail } from 'types/snsPost'

const INITIAL_SHOWED_POST_CONTENT_LENGTH = 200
const POST_CONTENT_STRING_START_INDEX = 0
const INITIAL_ACTIVE_STEP = 0

const StyledPostAuthorHeader = styled(PostAuthorHeader)`
  margin-bottom: 20px;
`

const StyledPostImageWrapper = styled.div`
  position: relative;
  text-align: center;
`

const snsPostImagesStyle = css`
  width: 70%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`

const StyledArrowButtonsWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const StyledMobileStepper = styled(MobileStepper)`
  justify-content: center;
  margin-bottom: 10px;
`

const paddingStyle = css`
  padding-left: 6px;
`

const StyledPostContentWrapper = styled.div`
  white-space: pre-line;
`

const StyledFashionItemInfosWrapper = styled.section`
  margin-bottom: 10px;
`

const StyledFashionItemInfos = styled.ul`
  display: flex;
  flex-wrap: wrap;
`

const StyledFashionItemInfo = styled.li`
  display: flex;
  flex-direction: column;
  flex-basis: calc(50% - 4px);
  padding: 8px;
  width: 50%;
  border: 1px solid ${LIGHT_GRAY};
  border-radius: 8px;
  margin: 2px;
`

const categoryStyle = css`
  font-weight: 700;
`

const createdAtStyle = css`
  display: block;
  margin: 10px 0;
  font-size: 15px;
  color: ${DEFAULT_GRAY};
`

type PostDescriptionContentsLayoutProps = {
  snsPostEditMenu: ReactNode | null
  likeButton: ReactNode | null
  bookmarkButton: ReactNode | null
  postCreatedDate: string
  postAuthor: SnsPostAuthorForPostDetail
  postImages: Image[]
  postContent: string
  postFashionItemInfos: FashionItemInfo[]
}

const PostDescriptionContentsLayout = ({
  snsPostEditMenu,
  likeButton,
  bookmarkButton,
  postCreatedDate,
  postAuthor,
  postImages,
  postContent,
  postFashionItemInfos,
}: PostDescriptionContentsLayoutProps) => {
  const createdDate = new Date(postCreatedDate)
  const formattedCreatedAt = getFormattedDate(createdDate)
  const initialPostContentToBeShowed = postContent.slice(
    POST_CONTENT_STRING_START_INDEX,
    INITIAL_SHOWED_POST_CONTENT_LENGTH
  )

  const [postContentToBeShowed, setPostContentToBeShowed] = useState(
    initialPostContentToBeShowed
  )
  const [isHiddenContentShowed, setIsHiddenContentShowed] = useState(false)
  const [activeStep, setActiveStep] = useState(INITIAL_ACTIVE_STEP)
  const maxSteps = postImages.length

  const handleNextButtonClick = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBackButtonClick = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleContentShowMoreButtonClick = () => {
    setPostContentToBeShowed(postContent)
    setIsHiddenContentShowed(true)
  }

  const handleContentHideButtonClick = () => {
    setPostContentToBeShowed(initialPostContentToBeShowed)
    setIsHiddenContentShowed(false)
  }

  return (
    <>
      <StyledPostAuthorHeader
        author={postAuthor}
        popoverMenu={snsPostEditMenu}
      />
      <StyledPostImageWrapper>
        <img
          css={snsPostImagesStyle}
          key={postImages[activeStep].url}
          src={postImages[activeStep].url}
          alt={postImages[activeStep].altText}
        />
        <StyledArrowButtonsWrapper>
          <IconButton
            onClick={handleBackButtonClick}
            disabled={activeStep === 0}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={activeStep === maxSteps - 1}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </StyledArrowButtonsWrapper>
      </StyledPostImageWrapper>
      <StyledMobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={null}
        backButton={null}
      />
      {likeButton}
      {bookmarkButton}
      <StyledFashionItemInfosWrapper>
        <span css={visuallyHidden}>착용한 제품 정보</span>
        <StyledFashionItemInfos>
          {postFashionItemInfos.map(fashionItemInfo => (
            <StyledFashionItemInfo key={fashionItemInfo.id}>
              <Typo component="span" css={categoryStyle}>
                {fashionItemInfo.category}
              </Typo>
              <Typo component="span">{fashionItemInfo.buyingPlace}</Typo>
              <Typo component="span">{fashionItemInfo.price}원</Typo>
            </StyledFashionItemInfo>
          ))}
        </StyledFashionItemInfos>
      </StyledFashionItemInfosWrapper>
      <div css={paddingStyle}>
        <StyledPostContentWrapper>
          <p>{postContentToBeShowed}</p>
        </StyledPostContentWrapper>
        {postContent.length > INITIAL_SHOWED_POST_CONTENT_LENGTH ? (
          <AdditionalContentShowingToggleButton
            isHiddenContentShowed={isHiddenContentShowed}
            onContentShowMoreButtonClick={handleContentShowMoreButtonClick}
            onContentHideButtonClick={handleContentHideButtonClick}
          />
        ) : null}
        <span css={createdAtStyle}>{formattedCreatedAt}</span>
      </div>
    </>
  )
}

export default PostDescriptionContentsLayout
