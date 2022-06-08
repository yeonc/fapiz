import Button from '@mui/material/Button'

const MessageButton = ({ user }) => {
  const goToChatRoom = () => {
    window.location.href = `/chat-room/${user.id}`
  }

  return <Button onClick={goToChatRoom}>메시지</Button>
}

export default MessageButton
