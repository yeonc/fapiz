import FollowToggleButton from 'components/buttons/followToggleButton'
import MessageButton from 'components/buttons/messageButton'

const ButtonsForUserCommunication = ({ user }) => {
  return (
    <>
      <FollowToggleButton />
      <MessageButton userId={user.id} />
    </>
  )
}

export default ButtonsForUserCommunication
