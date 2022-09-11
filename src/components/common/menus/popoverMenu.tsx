import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import deletePost from 'services/snsPost/deletePost'

const PopoverMenu = ({ postId, myId }) => {
  const router = useRouter()
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuOpen = () => {
    setIsMenuOpen(true)
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  const goToSnsPostEditPage = () => router.push(`/sns/post/edit/${postId}`)
  const goToMySnsPage = () => router.push(`/sns/${myId}`)

  const afterDeletePost = () => {
    goToMySnsPage()
  }

  const handleEditClick = () => {
    goToSnsPostEditPage()
  }

  const handleDeleteClick = async () => {
    const willDeleteSnsPost = window.confirm('게시물을 삭제하시겠습니까?')
    if (!willDeleteSnsPost) return

    try {
      await deletePost(postId)
      afterDeletePost()
    } catch (error) {
      console.error(error)
    }
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
