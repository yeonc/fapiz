import Image from 'next/image'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import { mgRight } from 'styles/layout'

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

const SnsPostSearchResultListItem = () => (
  <StyledSnsPostResultListItem>
    <Image
      src="/sample-image.jpg"
      alt="image-alt-text"
      width={200}
      height={200}
    />
    <div>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s
      </p>
      <Avatar src="" alt="avatar-alt-text" css={avatarStyle} />
      <span css={mgRight(8)}>yeonee</span>
      <span css={mgRight(8)}>2022-07-19</span>
      <span>좋아요 30</span>
    </div>
  </StyledSnsPostResultListItem>
)

export default SnsPostSearchResultListItem
