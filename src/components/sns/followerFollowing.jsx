import Button from '@mui/material/Button'
import { horizontal, mgRight } from 'styles/layout'
import useModalState from 'hooks/useModalState'
import FollowingListModal from 'components/modals/modal'
import FollowerListModal from 'components/modals/modal'
import UserList from './userList'

const FollowerFollowing = ({ followers, followings }) => {
  const {
    isOpen: isFollowingModalOpen,
    handleOpen: handleFollowingModalOpen,
    handleClose: handleFollowingModalClose,
  } = useModalState()

  const {
    isOpen: isFollowerModalOpen,
    handleOpen: handleFollowerModalOpen,
    handleClose: handleFollowerModalClose,
  } = useModalState()

  return (
    <>
      <dl css={horizontal}>
        <div css={[mgRight(18), horizontal]}>
          <dt css={mgRight(4)}>팔로워</dt>
          <dd>
            <Button variant="text" onClick={handleFollowerModalOpen}>
              {followers.length}
            </Button>
            <FollowerListModal
              title="Followers"
              contents={<UserList users={followers} />}
              open={isFollowerModalOpen}
              onClose={handleFollowerModalClose}
            />
          </dd>
        </div>
        <div css={horizontal}>
          <dt css={mgRight(4)}>팔로잉</dt>
          <dd>
            <Button variant="text" onClick={handleFollowingModalOpen}>
              {followings?.length}
            </Button>
            <FollowingListModal
              title="Followings"
              contents={<UserList users={followings} />}
              open={isFollowingModalOpen}
              onClose={handleFollowingModalClose}
            />
          </dd>
        </div>
      </dl>
    </>
  )
}

export default FollowerFollowing
