import styled from '@emotion/styled'
import UserAvatar from 'components/common/images/userAvatar'
import UserProfileText from './userProfileText'
import FollowerFollowing from './followerFollowing'

const UserProfileWrapper = styled.div`
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
    <UserProfileWrapper>
      <UserAvatar
        profileImageUrl={user.profileImage.url}
        username={user.username}
        styleConfig={{ width: 100, height: 100, marginRight: 4 }}
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
    </UserProfileWrapper>
  )
}

export default UserProfile
