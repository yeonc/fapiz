import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import Fab from '@mui/material/Fab'
import CreateIcon from '@mui/icons-material/Create'
import UserInfo from 'components/sns/userInfo'
import SnsPosts from 'components/sns/snsPosts'
import PreviousPageRedirect from 'components/common/redirect/previousPageRedirect'
import useUser from 'hooks/useUser'
import { BACKEND_URL } from 'constants/constants'

const positionOfCreateSnsPostButton = {
  position: 'fixed',
  bottom: 30,
  right: 30,
}

const REDIRECT_TO_PREVIOUS_PAGE_ALERT_MESSAGE =
  '존재하지 않는 유저입니다. 이전 페이지로 이동합니다'

const SnsPage = () => {
  const router = useRouter()
  const { userId } = router.query

  const { user: userFromStrapi } = useUser(userId)

  if (!userFromStrapi) {
    return null
  }

  const user = {
    id: userFromStrapi?.id,
    isHidden: userFromStrapi?.isHidden,
    username: userFromStrapi?.username,
    height: userFromStrapi?.height,
    weight: userFromStrapi?.weight,
    profileImageUrl: userFromStrapi?.profileImage
      ? BACKEND_URL + userFromStrapi?.profileImage.url
      : undefined,
    followers: userFromStrapi?.followers ?? [],
    followings: userFromStrapi?.followings ?? [],
  }

  const handleCreateSnsPostButtonClick = () => {
    router.push(`/sns/post/posting`)
  }

  return (
    <>
      {user.isHidden ? (
        <PreviousPageRedirect
          alertMessage={REDIRECT_TO_PREVIOUS_PAGE_ALERT_MESSAGE}
        />
      ) : (
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
      )}
    </>
  )
}

export default withHeader(SnsPage)
