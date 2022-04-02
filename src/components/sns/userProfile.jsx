import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import visuallyHidden from 'styles/visuallyHidden'
import { horizontal, mgRight } from 'styles/layout'
import { BACKEND_URL } from 'constants/constants'

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

const UserDetail = ({ snsPageUser }) => {
  const { username, weight, height, follower, following } = snsPageUser ?? {}

  return (
    <div>
      <h1>{username}</h1>
      <dl css={horizontal}>
        <div css={mgRight(8)}>
          <dt css={visuallyHidden}>키</dt>
          <dd>{height}cm</dd>
        </div>
        <div>
          <dt css={visuallyHidden}>몸무게</dt>
          <dd>{weight}kg</dd>
        </div>
      </dl>
      <dl css={horizontal}>
        <div css={[mgRight(18), horizontal]}>
          <dt css={mgRight(4)}>팔로워</dt>
          <dd>{follower?.length}</dd>
        </div>
        <div css={horizontal}>
          <dt css={mgRight(4)}>팔로잉</dt>
          <dd>{following?.length}</dd>
        </div>
      </dl>
    </div>
  )
}

const UserProfile = ({ snsPageUser }) => (
  <UserProfileWrapper>
    <UserAvatar
      profileImageUrl={snsPageUser?.profileImage?.url}
      username={snsPageUser?.username}
    />
    <UserDetail snsPageUser={snsPageUser} />
  </UserProfileWrapper>
)

export default UserProfile
