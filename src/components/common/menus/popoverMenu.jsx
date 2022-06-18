import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import deletePost from 'services/users/deletePost'

const PopoverMenu = ({ postId, myId }) => {
  const router = useRouter()
  const menuButtonRef = useRef()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuOpen = () => {
    setIsMenuOpen(true)
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  const handleEditClick = () => {
    router.push(`/sns/post/edit/${postId}`)
  }

  const handleDeleteClick = () => {
    deletePost(postId)
      .then(() => {
        router.push(`/sns/${myId}`)
      })
      .catch(console.error)
  }

  return (
    <div>
      <IconButton onClick={handleMenuOpen} ref={menuButtonRef}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={menuButtonRef.current}
        open={isMenuOpen}
        onClick={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>수정</MenuItem>
        <MenuItem onClick={handleDeleteClick}>삭제</MenuItem>
      </Menu>
    </div>
  )
}

export default PopoverMenu
