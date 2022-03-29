import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import visuallyHidden from 'styles/visuallyHidden'
import { horizontal, mgRight } from 'styles/layout'

const UserProfileWrapper = styled.div`
  display: flex;
`

const UserAvatar = () => (
  <Avatar
    alt="Remy Sharp"
    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    sx={{ width: 100, height: 100, marginRight: 4 }}
  />
)

const UserDetail = () => {
  const userInfo = { height: 160, weight: 50, follower: 300, following: 200 }

  return (
    <div>
      <h1>yeon</h1>
      <dl css={horizontal}>
        <div css={mgRight(8)}>
          <dt css={visuallyHidden}>키</dt>
          <dd>{userInfo.height}cm</dd>
        </div>
        <div>
          <dt css={visuallyHidden}>몸무게</dt>
          <dd>{userInfo.weight}kg</dd>
        </div>
      </dl>
      <dl css={horizontal}>
        <div css={[mgRight(18), horizontal]}>
          <dt css={mgRight(4)}>팔로워</dt>
          <dd>{userInfo.follower}</dd>
        </div>
        <div css={horizontal}>
          <dt css={mgRight(4)}>팔로잉</dt>
          <dd>{userInfo.following}</dd>
        </div>
      </dl>
    </div>
  )
}

const UserProfile = () => (
  <UserProfileWrapper>
    <UserAvatar />
    <UserDetail />
  </UserProfileWrapper>
)

export default UserProfile
