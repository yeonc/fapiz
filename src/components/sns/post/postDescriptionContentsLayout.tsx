import { useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import MobileStepper from '@mui/material/MobileStepper'
import IconButton from '@mui/material/IconButton'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import PostAuthorHeader from 'components/sns/post/postAuthorHeader'
import Typo from 'components/common/typo'
import getFormattedDate from 'utils/getFormattedDate'
import { DEFAULT_GRAY, LIGHT_GRAY } from 'styles/constants/color'
import visuallyHidden from 'styles/visuallyHidden'

const StyledPostAuthorHeader = styled(PostAuthorHeader)`
  margin-bottom: 10px;
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

const StyledLikeAndBookmarkButtonsWrapper = styled.div`
  text-align: center;
  margin-bottom: 6px;
`

const createdAtStyle = css`
  display: block;
  margin-bottom: 20px;
  font-size: 15px;
  color: ${DEFAULT_GRAY};
`

const StyledPostContentWrapper = styled.div`
  margin-bottom: 8px;
  max-height: 200px;
  overflow: auto;
`

const StyledFashionItemInfosWrapper = styled.section`
  margin-bottom: 28px;
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

const PostDescriptionContentsLayout = ({
  snsPostEditMenu,
  likeButton,
  bookmarkButton,
  postCreatedDate,
  postAuthor,
  postImages,
  postContent,
  postFashionItemsInfo,
}) => {
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = postImages.length

  const handleNextButtonClick = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBackButtonClick = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const createdDate = new Date(postCreatedDate)
  const formattedCreatedAt = getFormattedDate(createdDate)

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
      <StyledLikeAndBookmarkButtonsWrapper>
        {likeButton}
        {bookmarkButton}
      </StyledLikeAndBookmarkButtonsWrapper>
      <StyledPostContentWrapper>
        <p>{postContent}</p>
      </StyledPostContentWrapper>
      <span css={createdAtStyle}>{formattedCreatedAt}</span>
      {postFashionItemsInfo && (
        <StyledFashionItemInfosWrapper>
          <span css={visuallyHidden}>착용한 제품 정보</span>
          <StyledFashionItemInfos>
            {postFashionItemsInfo.map((fashionItemInfo: any, index: number) => (
              <StyledFashionItemInfo key={index.toString()}>
                <Typo component="span" css={categoryStyle}>
                  {fashionItemInfo.category}
                </Typo>
                <Typo component="span">{fashionItemInfo.buyingPlace}</Typo>
                <Typo component="span">{fashionItemInfo.price}원</Typo>
              </StyledFashionItemInfo>
            ))}
          </StyledFashionItemInfos>
        </StyledFashionItemInfosWrapper>
      )}
    </>
  )
}

export default PostDescriptionContentsLayout
