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
import { UserResponseWithFollowings } from 'types/user'

const followingStyle = css`
  color: ${DEFAULT_BLACK};
`

const StyledModal = styled(Modal)`
  border-radius: 10px;
`

const queryForUseMe = createUrlQuery({
  'populate[0]': 'followings',
})

const Following = ({ followings, afterFollow }) => {
  const { me } = useMe<UserResponseWithFollowings>(queryForUseMe)

  const {
    isOpen: isFollowingModalOpen,
    handleOpen: handleFollowingModalOpen,
    handleClose: handleFollowingModalClose,
  } = useModalState()

  return (
    <>
      <Button
        variant="text"
        onClick={handleFollowingModalOpen}
        css={followingStyle}
      >
        <dl css={horizontal}>
          <dt css={mgRight(10)}>팔로잉</dt>
          <dd>{followings.length}</dd>
        </dl>
      </Button>
      <StyledModal
        title="팔로잉"
        contents={
          <UserList users={followings} me={me} afterFollow={afterFollow} />
        }
        open={isFollowingModalOpen}
        onClose={handleFollowingModalClose}
      />
    </>
  )
}

export default Following
