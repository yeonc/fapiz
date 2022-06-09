import FollowToggleButton from 'components/buttons/followToggleButton'
import MessageButton from 'components/buttons/messageButton'

const ButtonsForUserCommunication = ({
  user,
  me,
  afterFollow,
  afterUnfollow,
}) => {
  return (
    <>
      <FollowToggleButton
        user={user}
        me={me}
        afterFollow={afterFollow}
        afterUnfollow={afterUnfollow}
      />
      <MessageButton user={user} />
    </>
  )
}

export default ButtonsForUserCommunication
