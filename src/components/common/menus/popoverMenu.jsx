import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const PopoverMenu = () => {
  const [menuOpenLocation, setMenuOpenLocation] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuOpen = e => {
    setMenuOpenLocation(e.target)
    setIsMenuOpen(true)
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  return (
    <div>
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={menuOpenLocation}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>수정</MenuItem>
        <MenuItem onClick={handleMenuClose}>삭제</MenuItem>
      </Menu>
    </div>
  )
}

export default PopoverMenu
