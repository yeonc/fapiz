import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Skeleton from '@mui/material/Skeleton'
import { mgBottom } from 'styles/layout'

const StyledSnsPostSearchResultWrapper = styled.div`
  display: flex;
  align-items: center;
`

const StyledPostTextWrapper = styled.div`
  flex-grow: 1;
`

const StyledSnsPostInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`

const PostImageStyle = css`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  margin-right: 16px;
`

type SnsPostSearchResultListItemSkeletonProps = {
  className?: string
}

const SnsPostSearchResultListItemSkeleton = ({
  className,
}: SnsPostSearchResultListItemSkeletonProps) => (
  <li className={className}>
    <StyledSnsPostSearchResultWrapper>
      <Skeleton animation="wave" variant="rectangular" css={PostImageStyle} />
      <StyledPostTextWrapper>
        <div css={mgBottom(16)}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </div>
        <StyledSnsPostInfoWrapper>
          <Skeleton animation="wave" width="50%" />
        </StyledSnsPostInfoWrapper>
      </StyledPostTextWrapper>
    </StyledSnsPostSearchResultWrapper>
  </li>
)

export default SnsPostSearchResultListItemSkeleton
