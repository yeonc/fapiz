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
import { BACKEND_URL } from 'constants/constants'
import { UserForUserInfo } from 'types/user'
import { mgRight, mgBottom } from 'styles/layout'
import visuallyHidden from 'styles/visuallyHidden'

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

const UserInfo = ({ userId, className }: UserInfoProps) => {
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

  const refetch = () => {
    const token = getToken()
    if (!token) return null

    mutate({
      url: `${BACKEND_URL}/api/users/me`,
      config: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })
    mutate(user.id ? { url: `/api/users/${user.id}` } : null)
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
