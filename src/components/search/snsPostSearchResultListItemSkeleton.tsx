import styled from '@emotion/styled'
import Skeleton from '@mui/material/Skeleton'
import { setMarginBottom } from 'styles/layout'

const StyledSnsPostSearchResultWrapper = styled.div`
  display: flex;
  align-items: center;
`

const StyledPostImageWrapper = styled.div`
  width: 120px;
  height: 120px;
  margin-right: 14px;
`

const StyledPostTextWrapper = styled.div`
  flex-grow: 1;
`

const StyledSnsPostInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`

type SnsPostSearchResultListItemSkeletonProps = {
  className?: string
}

const SnsPostSearchResultListItemSkeleton = ({
  className,
}: SnsPostSearchResultListItemSkeletonProps) => (
  <li className={className}>
    <StyledSnsPostSearchResultWrapper>
      <StyledPostImageWrapper>
        <Skeleton variant="rectangular" width={120} height={120} />
      </StyledPostImageWrapper>
      <StyledPostTextWrapper>
        <div css={setMarginBottom(16)}>
          <Skeleton />
          <Skeleton />
        </div>
        <StyledSnsPostInfoWrapper>
          <Skeleton width="50%" />
        </StyledSnsPostInfoWrapper>
      </StyledPostTextWrapper>
    </StyledSnsPostSearchResultWrapper>
  </li>
)

export default SnsPostSearchResultListItemSkeleton
