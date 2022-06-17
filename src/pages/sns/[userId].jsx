import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import Fab from '@mui/material/Fab'
import CreateIcon from '@mui/icons-material/Create'
import UserInfo from 'components/sns/userInfo'
import SnsPosts from 'components/sns/snsPosts'
import useUser from 'hooks/useUser'

const positionOfCreateSnsPostButton = {
  position: 'fixed',
  bottom: 30,
  right: 30,
}

const SnsPage = () => {
  const router = useRouter()
  const { userId } = router.query

  const { user, error, isLoading } = useUser(userId)

  const handleCreateSnsPostButtonClick = () => {
    router.push(`/sns/post/posting`)
  }

  if (isLoading) {
    return <p>로딩중...</p>
  }

  if (error) {
    return <p>에러가 발생했습니다. 홈으로 돌아가세요</p>
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
