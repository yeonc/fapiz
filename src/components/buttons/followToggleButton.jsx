import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'
import Button from '@mui/material/Button'
import follow from 'services/users/follow'
import unfollow from 'services/users/unfollow'
import useUser from 'hooks/useUser'

const FollowToggleButton = ({ me }) => {
  const { mutate } = useSWRConfig()

  const router = useRouter()
  const { userId } = router.query

  const { user, isLoading, isError } = useUser(userId)

  if (isLoading) {
    return <p>로딩중...</p>
  }

  if (isError) {
    return <p>에러가 발생했습니다. 홈으로 돌아가세요</p>
  }

  const followUser = async () => {
    await follow({ myId: me.id, targetUserId: user.id })
    mutate({ url: `/api/users/${user.id}` })
  }

  const unfollowUser = async () => {
    const myFollowingUserIds = me.following.map(user => user.id)
    await unfollow({
      myId: me.id,
      targetUserId: user.id,
      myFollowingUserIds,
    })
    mutate({ url: `/api/users/${user.id}` })
  }

  const isFollowing = user.follower.some(person => person.id === me.id)

  const buttonText = isFollowing ? '팔로우 취소하기' : '팔로우하기'
  const handleFollow = isFollowing ? unfollowUser : followUser

  return <Button onClick={handleFollow}>{buttonText}</Button>
}

export default FollowToggleButton
