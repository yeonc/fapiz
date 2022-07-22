import Image from 'next/image'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import { mgRight } from 'styles/layout'
import { SnsPostForSearching } from 'types/snsPost'

const StyledSnsPostResultListItem = styled.li`
  display: flex;
  margin-bottom: 20px;
`

const avatarStyle = css`
  display: inline-flex;
  width: 24px;
  height: 24px;
  margin-right: 8px;
`

type SnsPostSearchResultListItemProps = {
  snsPost: SnsPostForSearching
}

const SnsPostSearchResultListItem = ({
  snsPost,
}: SnsPostSearchResultListItemProps) => (
  <StyledSnsPostResultListItem>
    <Image
      src={snsPost.firstImage.url}
      alt={snsPost.firstImage.altText}
      width={150}
      height={150}
    />
    <div>
      <p>{snsPost.content}</p>
      <Avatar
        src={snsPost.author.avatarUrl}
        alt={snsPost.author.username}
        css={avatarStyle}
      />
      <span css={mgRight(8)}>{snsPost.author.username}</span>
      <span css={mgRight(8)}>{snsPost.createdAt}</span>
      <span>좋아요 {snsPost.likeNumbers}</span>
    </div>
  </StyledSnsPostResultListItem>
)

export default SnsPostSearchResultListItem
