import { useSWRConfig } from 'swr'
import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import FollowToggleButton from 'components/common/buttons/followToggleButton'
import MessageButton from 'components/common/buttons/messageButton'
import Follower from 'components/sns/follower'
import Following from 'components/sns/following'
import { horizontal, mgRight } from 'styles/layout'
import visuallyHidden from 'styles/visuallyHidden'
import useMe from 'hooks/useMe'

const StyledUserInfoWrapper = styled.header`
  display: flex;
  align-items: center;
`

const StyledUserInfoRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledUserProfileTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledFollowWrapper = styled.div`
  display: flex;
`

const StyledButtonsWrapper = styled.div`
  display: flex;
`

const UserInfo = ({ user }) => {
  const { mutate } = useSWRConfig()

  const { me } = useMe()

  const isMySnsPage = user.id === me?.id
  const isButtonsShow = me && !isMySnsPage

  const refetch = () => mutate({ url: `/api/users/${user.id}` })
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
      <StyledUserInfoRightWrapper>
        <StyledUserProfileTextWrapper>
          <Typography variant="h4" component="h1">
            {user.username}
          </Typography>
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
        </StyledUserProfileTextWrapper>
        <StyledFollowWrapper>
          <Follower followers={user.followers} />
          <Following followings={user.followings} />
        </StyledFollowWrapper>
        <StyledButtonsWrapper>
          {isButtonsShow && (
            <>
              <FollowToggleButton
                myId={me.id}
                myFollowings={me.followings}
                targetUserId={user.id}
                afterFollow={afterFollow}
              />
              <MessageButton userId={user.id} />
            </>
          )}
        </StyledButtonsWrapper>
      </StyledUserInfoRightWrapper>
    </StyledUserInfoWrapper>
  )
}

export default UserInfo
