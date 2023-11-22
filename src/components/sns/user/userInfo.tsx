import { useSWRConfig } from 'swr'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import Typo from 'components/common/typo'
import FollowToggleButton from 'components/common/buttons/followToggleButton'
import Follower from 'components/sns/user/follower'
import Following from 'components/sns/user/following'
import useMe from 'hooks/useMe'
import useUser from 'hooks/useUser'
import getToken from 'utils/getToken'
import createUrlQuery from 'utils/createUrlQuery'
import { BACKEND_URL } from 'constants/constants'
import { mgRight, mgBottom } from 'styles/layout'
import visuallyHidden from 'styles/visuallyHidden'
import { UserResponseWithFollowings } from 'types/user'

const StyledBodyInfoWrapper = styled.dl`
  display: flex;
  justify-content: center;
`

const avatarStyle = css`
  width: 130px;
  height: 130px;
  margin: 0 auto 10px;
`

type UserInfoProps = {
  userId: number
  className?: string
}

const queryForUseMe = createUrlQuery({
  'populate[0]': 'followings',
})

const queryForUseUser = createUrlQuery({
  'populate[0]': 'profileImage',
  'populate[1]': 'followers.profileImage',
  'populate[2]': 'followings.profileImage',
})

const UserInfo = ({ userId, className }: UserInfoProps) => {
  const { mutate } = useSWRConfig()

  const { me } = useMe<UserResponseWithFollowings>(queryForUseMe)
  const { user: userFromStrapi } = useUser(userId, queryForUseUser)

  if (!userFromStrapi) {
    return null
  }

  console.log(userFromStrapi)

  const user = {
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

  const refetch = () => {
    const token = getToken()
    if (!token) return null

    mutate({
      url: `${BACKEND_URL}/api/users/me?${queryForUseMe}`,
      config: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })
    mutate(user.id ? { url: `/api/users/${user.id}?${queryForUseUser}` } : null)
  }

  const afterFollow = () => {
    refetch()
  }

  return (
    <header className={className}>
      <Avatar
        alt={user.username}
        src={user.profileImageUrl}
        css={avatarStyle}
      />
      <Typo variant="h4" component="h1" css={mgBottom(4)}>
        {user.username}
      </Typo>
      <StyledBodyInfoWrapper>
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
      </StyledBodyInfoWrapper>
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
        </div>
      )}
    </header>
  )
}

export default UserInfo
