import Image from 'next/image'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import ROUTE_URL from 'constants/routeUrl'
import { SnsPostForSearching } from 'types/snsPost'
import { setMarginBottom, setMarginRight } from 'styles/layout'

const StyledSnsPostSearchResultWrapper = styled.div`
  display: flex;
  align-items: center;
`

const StyledPostImageWrapper = styled.div`
  width: 120px;
  height: 120px;
  margin-right: 14px;
`

const StyledSnsPostInfoWrapper = styled.div`
  display: flex;
  align-items: center;
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
    <Link href={`${ROUTE_URL.SNS}/post/${snsPost.id}`}>
      <StyledSnsPostSearchResultWrapper>
        <StyledPostImageWrapper>
          <Image
            src={snsPost.firstImage.url}
            alt={snsPost.firstImage.altText}
            width="120px"
            height="120px"
            layout="fixed"
          />
        </StyledPostImageWrapper>
        <div>
          <p css={setMarginBottom(16)}>{snsPost.content}</p>
          <StyledSnsPostInfoWrapper>
            <Avatar
              src={snsPost.author.avatarUrl}
              alt={snsPost.author.username}
              css={avatarStyle}
            />
            <span css={setMarginRight(8)}>{snsPost.author.username}</span>
            <span css={setMarginRight(8)}>{snsPost.createdAt}</span>
            <span css={setMarginRight(8)}>댓글 {snsPost.commentCount}</span>
            <span>좋아요 {snsPost.likeNumbers}</span>
          </StyledSnsPostInfoWrapper>
        </div>
      </StyledSnsPostSearchResultWrapper>
    </Link>
  </li>
)

export default SnsPostSearchResultListItem
