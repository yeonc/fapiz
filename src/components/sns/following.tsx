import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import { mgRight } from 'styles/layout'
import useModalState from 'hooks/useModalState'
import FollowingListModal from 'components/common/modals/modal'
import UserList from 'components/sns/userList'
import useMe from 'hooks/useMe'

const StyledFollowingWrapper = styled.dl`
  display: inline-flex;
  align-items: center;
`

const Following = ({ followings, afterFollow }) => {
  const { me } = useMe()

  const {
    isOpen: isFollowingModalOpen,
    handleOpen: handleFollowingModalOpen,
    handleClose: handleFollowingModalClose,
  } = useModalState()

  return (
    <>
      <StyledFollowingWrapper>
        <dt css={mgRight(4)}>팔로잉</dt>
        <dd>
          <Button variant="text" onClick={handleFollowingModalOpen}>
            {followings.length}
          </Button>
        </dd>
      </StyledFollowingWrapper>
      <FollowingListModal
        title="Followings"
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
