import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'

const StyledUserSearchResultListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
`

const avatarStyle = css`
  width: 100px;
  height: 100px;
  margin-bottom: 6px;
`

const usernameAndGenderWrapperStyle = css`
  margin-bottom: 6px;
`

const usernameStyle = css`
  display: inline;
  margin-right: 10px;
`

const fashionStyleTagStyle = css`
  display: inline-block;
  padding: 6px;
  border-radius: 18px;
  font-size: 14px;
  background-color: #6feeff83;
`

const UserSearchResultListItem = () => (
  <StyledUserSearchResultListItem>
    <Avatar src="" alt="avatar-alt-text" css={avatarStyle} />
    <div css={usernameAndGenderWrapperStyle}>
      <h3 css={usernameStyle}>yeon</h3>
      <span>여</span>
    </div>
    <ul>
      <li css={fashionStyleTagStyle}>#스포티</li>
      <li css={fashionStyleTagStyle}>#아메카지</li>
      <li css={fashionStyleTagStyle}>#댄디</li>
    </ul>
  </StyledUserSearchResultListItem>
)

export default UserSearchResultListItem
