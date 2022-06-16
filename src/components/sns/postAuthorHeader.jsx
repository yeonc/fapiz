import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import UserAvatar from '@mui/material/Avatar'
import UserProfileText from 'components/sns/userProfileText'
import styled from '@emotion/styled'
import { BACKEND_URL } from 'constants/constants'

const MenuButton = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>수정</MenuItem>
        <MenuItem onClick={handleClose}>삭제</MenuItem>
      </Menu>
    </div>
  )
}

const PostAuthorHeaderWrapper = styled.header`
  display: flex;
`
const PostAuthorHeader = ({ author }) => (
  <PostAuthorHeaderWrapper>
    <UserAvatar
      alt={author.username}
      src={BACKEND_URL + author.avatarUrl}
      sx={{ width: 50, height: 50, marginRight: 2 }}
    />
    <UserProfileText
      username={author.username}
      height={author.height}
      weight={author.weight}
      usernameTypoVarient="h6"
    />
    <MenuButton />
  </PostAuthorHeaderWrapper>
)

export default PostAuthorHeader
