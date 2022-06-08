import FollowToggleButton from 'components/buttons/followToggleButton'
import MessageButton from 'components/buttons/messageButton'

const ButtonsForUserCommunication = ({ user, afterFollow, afterUnfollow }) => {
  return (
    <>
      <FollowToggleButton
        user={user}
        afterFollow={afterFollow}
        afterUnfollow={afterUnfollow}
      />
      <MessageButton user={user} />
    </>
  )
}

export default ButtonsForUserCommunication
