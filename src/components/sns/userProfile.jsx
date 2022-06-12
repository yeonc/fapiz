import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import { BACKEND_URL } from 'constants/constants'
import UserProfileText from './userProfileText'
import FollowerFollowing from './followerFollowing'

const UserProfileWrapper = styled.div`
  display: flex;
`

const UserAvatar = ({ profileImageUrl, username }) => (
  <Avatar
    alt={username}
    src={BACKEND_URL + profileImageUrl}
    sx={{ width: 100, height: 100, marginRight: 4 }}
  />
)

const UserProfileContents = ({ userProfileText, followerFollowing }) => (
  <div>
    {userProfileText}
    {followerFollowing}
  </div>
)

const UserProfile = ({ user }) => {
  return (
    <UserProfileWrapper>
      <UserAvatar
        profileImageUrl={user.profileImage.url}
        username={user.username}
      />
      <UserProfileContents
        userProfileText={
          <UserProfileText
            username={user.username}
            height={user.height}
            weight={user.weight}
          />
        }
        followerFollowing={
          <FollowerFollowing
            followers={user.follower}
            followings={user.following}
          />
        }
      />
    </UserProfileWrapper>
  )
}

export default UserProfile
