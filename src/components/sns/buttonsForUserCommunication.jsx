import FollowToggleButton from 'components/buttons/followToggleButton'
import MessageButton from 'components/buttons/messageButton'

const ButtonsForUserCommunication = ({ me }) => {
  return (
    <>
      <FollowToggleButton me={me} />
      <MessageButton />
    </>
  )
}

export default ButtonsForUserCommunication
