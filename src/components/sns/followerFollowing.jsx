import { useState } from 'react'
import Button from '@mui/material/Button'
import FollowerListModal from 'components/sns/followerListModal'
import FollowingListModal from 'components/sns/followingListModal'
import { horizontal, mgRight } from 'styles/layout'

const FollowerFollowing = ({ followers, followings }) => {
  const [followingModalOpen, setFollowingModalOpen] = useState(false)
  const [followerModalOpen, setFollowerModalOpen] = useState(false)
  const handleFollowingModalOpen = () => setFollowingModalOpen(true)
  const handleFollowingModalClose = () => setFollowingModalOpen(false)
  const handleFollowerModalOpen = () => setFollowerModalOpen(true)
  const handleFollowerModalClose = () => setFollowerModalOpen(false)

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
              onClose={handleFollowerModalClose}
              open={followerModalOpen}
              followers={followers}
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
              onClose={handleFollowingModalClose}
              open={followingModalOpen}
              followings={followings}
            />
          </dd>
        </div>
      </dl>
    </>
  )
}

export default FollowerFollowing
