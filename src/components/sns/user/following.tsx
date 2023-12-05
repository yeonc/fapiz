import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import useModalState from 'hooks/useModalState'
import Modal from 'components/common/modals/modal'
import UserList from 'components/sns/user/userList'
import { DEFAULT_BLACK } from 'styles/constants/color'
import { horizontal, mgRight } from 'styles/layout'
import { UserWithProfileImageAndFollowers } from 'types/user'

const followingStyle = css`
  color: ${DEFAULT_BLACK};
`

const StyledModal = styled(Modal)`
  border-radius: 10px;
`

type FollowingProps = {
  followings: UserWithProfileImageAndFollowers[]
  afterFollow: () => void
}

const Following = ({ followings, afterFollow }: FollowingProps) => {
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
        contents={<UserList users={followings} afterFollow={afterFollow} />}
        open={isFollowingModalOpen}
        onClose={handleFollowingModalClose}
      />
    </>
  )
}

export default Following
