import { useEffect } from 'react'
import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import Fab from '@mui/material/Fab'
import CreateIcon from '@mui/icons-material/Create'
import UserInfo from 'components/sns/userInfo'
import SnsPosts from 'components/sns/snsPosts'
import useUser from 'hooks/useUser'
import { BACKEND_URL } from 'constants/constants'

const positionOfCreateSnsPostButton = {
  position: 'fixed',
  bottom: 30,
  right: 30,
}

const SnsPage = () => {
  const router = useRouter()
  const { userId } = router.query

  const { user: userFromStrapi, error } = useUser(userId)

  const user = {
    id: userFromStrapi?.id,
    isHidden: userFromStrapi?.isHidden,
    username: userFromStrapi?.username,
    height: userFromStrapi?.height,
    weight: userFromStrapi?.weight,
    profileImageUrl: userFromStrapi?.profileImage
      ? BACKEND_URL + userFromStrapi?.profileImage.url
      : undefined,
    followers: userFromStrapi?.followers,
    followings: userFromStrapi?.followings,
  }

  const handleCreateSnsPostButtonClick = () => {
    router.push(`/sns/post/posting`)
  }

  useEffect(() => {
    if (user.isHidden) {
      alert('없는 사용자입니다. 이전 페이지로 돌아갑니다.')
      router.back()
    }
  })

  if (error) {
    return <p>에러가 발생했습니다. 홈으로 돌아가세요</p>
  }

  if (!userFromStrapi) {
    return <p>유저 정보를 받아오는 중입니다...</p>
  }

  return (
    <>
      <UserInfo user={user} />
      <SnsPosts userId={user.id} />
      <Fab
        color="primary"
        aria-label="SNS 게시물 등록"
        sx={positionOfCreateSnsPostButton}
        onClick={handleCreateSnsPostButtonClick}
      >
        <CreateIcon />
      </Fab>
    </>
  )
}

export default withHeader(SnsPage)
