import { useRouter } from 'next/router'
import Button from '@mui/material/Button'

const MessageButton = ({ user }) => {
  const router = useRouter()

  const goToChatRoom = () => {
    router.push(`/chat-room/${user.id}`)
  }

  return <Button onClick={goToChatRoom}>메시지</Button>
}

export default MessageButton
