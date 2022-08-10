import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import { mgRight } from 'styles/layout'
import useModalState from 'hooks/useModalState'
import FollowerListModal from 'components/common/modals/modal'
import UserList from 'components/sns/user/userList'
import useMe from 'hooks/useMe'

const StyledFollowerWrapper = styled.dl`
  display: inline-flex;
  align-items: center;
`

const Follower = ({ followers, afterFollow }) => {
  const { me } = useMe()

  const {
    isOpen: isFollowerModalOpen,
    handleOpen: handleFollowerModalOpen,
    handleClose: handleFollowerModalClose,
  } = useModalState()

  return (
    <>
      <StyledFollowerWrapper>
        <dt css={mgRight(4)}>팔로워</dt>
        <dd>
          <Button variant="text" onClick={handleFollowerModalOpen}>
            {followers.length}
          </Button>
        </dd>
      </StyledFollowerWrapper>
      <FollowerListModal
        title="Followers"
        contents={
          <UserList users={followers} me={me} afterFollow={afterFollow} />
        }
        open={isFollowerModalOpen}
        onClose={handleFollowerModalClose}
      />
    </>
  )
}

export default Follower
