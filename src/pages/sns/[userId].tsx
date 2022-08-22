import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import { css } from '@emotion/react'
import Fab from '@mui/material/Fab'
import CreateIcon from '@mui/icons-material/Create'
import UserInfo from 'components/sns/user/userInfo'
import SnsPosts from 'components/sns/post/snsPosts'
import useMe from 'hooks/useMe'
import getSafeNumberFromQuery from 'utils/getSafeNumberFromQuery'

const positionOfSnsPostCreateButton = css`
  position: fixed;
  bottom: 30px;
  right: 30px;
`

const SnsPage = () => {
  const router = useRouter()
  const { userId: userIdFromQuery } = router.query
  const userId = userIdFromQuery
    ? getSafeNumberFromQuery(userIdFromQuery)
    : undefined

  const { me } = useMe()

  const handleSnsPostCreateButtonClick = () => {
    router.push(`/sns/post/posting`)
  }

  const isMySnsPage = me?.id === userId

  return (
    <>
      {userId && (
        <>
          <UserInfo userId={userId} />
          <SnsPosts userId={userId} />
        </>
      )}
      {isMySnsPage && (
        <Fab
          color="primary"
          aria-label="SNS 게시물 등록"
          css={positionOfSnsPostCreateButton}
          onClick={handleSnsPostCreateButtonClick}
        >
          <CreateIcon />
        </Fab>
      )}
    </>
  )
}

export default withHeader(SnsPage)
