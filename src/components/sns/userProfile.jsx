import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import UserProfileText from 'components/sns/userProfileText'
import FollowerFollowing from 'components/sns/followerFollowing'
import { BACKEND_URL } from 'constants/constants'

const StyledUserProfileWrapper = styled.div`
  display: flex;
`

const UserProfileContents = ({ userProfileText, followerFollowing }) => (
  <div>
    {userProfileText}
    {followerFollowing}
  </div>
)

const UserProfile = ({ user }) => {
  return (
    <StyledUserProfileWrapper>
      <Avatar
        alt={user.username}
        src={BACKEND_URL + user.profileImage.url}
        sx={{ width: 100, height: 100, marginRight: 4 }}
      />
      <UserProfileContents
        userProfileText={
          <UserProfileText
            username={user.username}
            height={user.height}
            weight={user.weight}
            usernameTypoVarient="h4"
          />
        }
        followerFollowing={
          <FollowerFollowing
            followers={user.follower}
            followings={user.following}
          />
        }
      />
    </StyledUserProfileWrapper>
  )
}

export default UserProfile
