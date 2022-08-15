import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import ROUTE_URL from 'constants/routeUrl'
import { SnsPostForSearching } from 'types/snsPost'
import { mgBottom, mgRight } from 'styles/layout'
import { DEFAULT_BLACK } from 'styles/constants/color'

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

const postImageStyle = css`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  margin-right: 16px;
`

const avatarStyle = css`
  display: inline-flex;
  width: 24px;
  height: 24px;
  margin-right: 8px;
`

type SnsPostSearchResultListItemProps = {
  className?: string
  snsPost: SnsPostForSearching
}

const SnsPostSearchResultListItem = ({
  className,
  snsPost,
}: SnsPostSearchResultListItemProps) => (
  <li className={className}>
    <Link href={`${ROUTE_URL.SNS}/post/${snsPost.id}`} color={DEFAULT_BLACK}>
      <StyledSnsPostSearchResultWrapper>
        <img
          src={snsPost.firstImage.url}
          alt={snsPost.firstImage.altText}
          css={postImageStyle}
        />
        <StyledPostTextWrapper>
          <p css={mgBottom(16)}>{snsPost.content}</p>
          <StyledSnsPostInfoWrapper>
            <Avatar
              src={snsPost.author.avatarUrl}
              alt={snsPost.author.username}
              css={avatarStyle}
            />
            <span css={mgRight(8)}>{snsPost.author.username}</span>
            <span css={mgRight(8)}>{snsPost.createdAt}</span>
            <span css={mgRight(8)}>댓글 {snsPost.commentCount}</span>
            <span>좋아요 {snsPost.likeNumbers}</span>
          </StyledSnsPostInfoWrapper>
        </StyledPostTextWrapper>
      </StyledSnsPostSearchResultWrapper>
    </Link>
  </li>
)

export default SnsPostSearchResultListItem
