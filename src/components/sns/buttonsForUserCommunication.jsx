import FollowToggleButton from 'components/buttons/followToggleButton'
import MessageButton from 'components/buttons/messageButton'

const ButtonsForUserCommunication = ({ user, me }) => {
  return (
    <>
      <FollowToggleButton user={user} me={me} />
      <MessageButton user={user} />
    </>
  )
}

export default ButtonsForUserCommunication
