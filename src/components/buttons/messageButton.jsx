import { useRouter } from 'next/router'
import Button from '@mui/material/Button'

const MessageButton = ({ userId }) => {
  const router = useRouter()

  const goToChatRoom = () => {
    router.push(`/chat-room/${userId}`)
  }

  return <Button onClick={goToChatRoom}>메시지</Button>
}

export default MessageButton
