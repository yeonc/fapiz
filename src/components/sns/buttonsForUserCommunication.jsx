import Button from '@mui/material/Button'

const FollowToggleButton = () => <Button>팔로잉</Button>

const MessageButton = ({ user }) => {
  const goToChatRoom = () => {
    window.location.href = `/chat-room/${user.id}`
  }

  return <Button onClick={goToChatRoom}>메시지</Button>
}

const ButtonsForUserCommunication = ({ user }) => (
  <>
    <FollowToggleButton />
    <MessageButton user={user} />
  </>
)

export default ButtonsForUserCommunication
