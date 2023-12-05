import { useSWRConfig } from 'swr'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import Typo from 'components/common/typo'
import FollowToggleButton from 'components/common/buttons/followToggleButton'
import Follower from 'components/sns/user/follower'
import Following from 'components/sns/user/following'
import useUser from 'hooks/useUser'
import createUrlQuery from 'utils/createUrlQuery'
import { mgRight, mgBottom } from 'styles/layout'
import visuallyHidden from 'styles/visuallyHidden'
import { UserResponseWithAdditionalFields } from 'types/user'
import { useAuth } from 'context/AuthContext'
import getIdsFromArrayOfObject from 'utils/getIdsFromArrayOfObject'

const StyledBodyInfoWrapper = styled.dl`
  display: flex;
  justify-content: center;
`

const avatarStyle = css`
  width: 130px;
  height: 130px;
  margin: 0 auto 10px;
`

const queryForUseUser = createUrlQuery({
  'populate[0]': 'profileImage',
  'populate[1]': 'followers.profileImage',
  'populate[2]': 'followings.profileImage',
  'populate[3]': 'followers.followers',
  'populate[4]': 'followings.followers',
})

export type UserForSnsUserInfo = Omit<
  UserResponseWithAdditionalFields,
  'gender' | 'bodyShape' | 'fashionStyles' | 'profileImage'
> & { profileImageUrl?: string }

type UserInfoProps = {
  userId: number
  className?: string
}

const UserInfo = ({ userId, className }: UserInfoProps) => {
  const { mutate } = useSWRConfig()
  const { me } = useAuth()
  const { user: userFromStrapi } = useUser<UserResponseWithAdditionalFields>(
    userId,
    queryForUseUser
  )

  if (!userFromStrapi) {
    return null
  }

  const user = sanitizeUser(userFromStrapi)

  const isMySnsPage = user.id === me?.id
  const isLoggedIn = !!me

  const refetch = () => {
    mutate(user.id ? { url: `/api/users/${user.id}?${queryForUseUser}` } : null)
  }

  const afterFollow = () => refetch()

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
            targetUserId={user.id}
            targetUserFollowerIds={getIdsFromArrayOfObject(user.followers)}
            afterFollow={afterFollow}
          />
        </div>
      )}
    </header>
  )
}

export default UserInfo

const sanitizeUser = (
  user: UserResponseWithAdditionalFields
): UserForSnsUserInfo => ({
  id: user.id,
  username: user.username,
  height: user.height,
  weight: user.weight,
  profileImageUrl: user.profileImage?.url,
  followers: user.followers,
  followings: user.followings,
})
