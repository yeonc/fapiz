import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import useModalState from 'hooks/useModalState'
import Modal from 'components/common/modals/modal'
import UserList from 'components/sns/user/userList'
import useMe from 'hooks/useMe'
import createUrlQuery from 'utils/createUrlQuery'
import { DEFAULT_BLACK } from 'styles/constants/color'
import { horizontal, mgRight } from 'styles/layout'
import { UserResponseWithFollowings, UserWithProfileImage } from 'types/user'

const followerStyle = css`
  color: ${DEFAULT_BLACK};
`

const StyledModal = styled(Modal)`
  border-radius: 10px;
`

const queryForUseMe = createUrlQuery({
  'populate[0]': 'followings',
})

type FollowerProps = {
  followers: UserWithProfileImage[]
  afterFollow: () => void
}

const Follower = ({ followers, afterFollow }: FollowerProps) => {
  const { me } = useMe<UserResponseWithFollowings>(queryForUseMe)
  const {
    isOpen: isFollowerModalOpen,
    handleOpen: handleFollowerModalOpen,
    handleClose: handleFollowerModalClose,
  } = useModalState()

  return (
    <>
      <Button
        variant="text"
        onClick={handleFollowerModalOpen}
        css={followerStyle}
      >
        <dl css={horizontal}>
          <dt css={mgRight(10)}>팔로워</dt>
          <dd>{followers.length}</dd>
        </dl>
      </Button>
      <StyledModal
        title="팔로워"
        contents={
          me && <UserList users={followers} me={me} afterFollow={afterFollow} />
        }
        open={isFollowerModalOpen}
        onClose={handleFollowerModalClose}
      />
    </>
  )
}

export default Follower
