import { useSWRConfig } from 'swr'
import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import Typo from 'components/common/typo'
import FollowToggleButton from 'components/common/buttons/followToggleButton'
import MessageButton from 'components/common/buttons/messageButton'
import Follower from 'components/sns/user/follower'
import Following from 'components/sns/user/following'
import useMe from 'hooks/useMe'
import useUser from 'hooks/useUser'
import { UserForUserInfo } from 'types/user'
import { horizontal, mgRight } from 'styles/layout'
import visuallyHidden from 'styles/visuallyHidden'

const StyledUserInfoWrapper = styled.header`
  display: flex;
  align-items: center;
`

const UserInfo = ({ userId }) => {
  const { mutate } = useSWRConfig()

  const { me } = useMe()
  const { user: userFromStrapi } = useUser(userId)

  if (!userFromStrapi) {
    return null
  }

  const user: UserForUserInfo = {
    id: userFromStrapi.id,
    username: userFromStrapi.username,
    height: userFromStrapi.height,
    weight: userFromStrapi.weight,
    profileImageUrl: userFromStrapi.profileImage?.url,
    followers: userFromStrapi.followers,
    followings: userFromStrapi.followings,
  }

  const isMySnsPage = user.id === me?.id
  const isLoggedIn = !!me

  const refetch = () =>
    mutate(user.id ? { url: `/api/users/${user.id}` } : null)

  const afterFollow = () => {
    refetch()
  }

  return (
    <StyledUserInfoWrapper>
      <Avatar
        alt={user.username}
        src={user.profileImageUrl}
        sx={{ width: 130, height: 130, marginRight: 4 }}
      />
      <div>
        <Typo variant="h4" component="h1">
          {user.username}
        </Typo>
        <dl css={horizontal}>
          {user.height && (
            <div css={mgRight(8)}>
              <dt css={visuallyHidden}>키</dt>
              <dd>{user.height}cm</dd>
            </div>
          )}
          {user.weight && (
            <div>
              <dt css={visuallyHidden}>몸무게</dt>
              <dd>{user.weight}kg</dd>
            </div>
          )}
        </dl>
        <Follower followers={user.followers} afterFollow={afterFollow} />
        <Following followings={user.followings} afterFollow={afterFollow} />
        {isLoggedIn && !isMySnsPage && (
          <div>
            <FollowToggleButton
              myId={me.id}
              myFollowings={me.followings}
              targetUserId={user.id}
              afterFollow={afterFollow}
            />
            <MessageButton userId={user.id} />
          </div>
        )}
      </div>
    </StyledUserInfoWrapper>
  )
}

export default UserInfo
