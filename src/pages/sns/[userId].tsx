import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Fab from '@mui/material/Fab'
import CreateIcon from '@mui/icons-material/Create'
import UserInfo from 'components/sns/user/userInfo'
import SnsPosts from 'components/sns/post/snsPosts'
import MaxWidthContainer from 'components/layouts/containers/maxWidthContainer'
import getSafeNumberFromQuery from 'utils/getSafeNumberFromQuery'
import { LIGHT_GRAY } from 'styles/constants/color'
import { useAuth } from 'context/AuthContext'
import SnsPageHeadContents from 'components/sns/page/snsPageHeadContents'

const StyledSnsPageWrapper = styled.div`
  padding: 30px 0;
`

const positionOfSnsPostCreateButton = css`
  position: fixed;
  bottom: 30px;
  right: 30px;
`

const StyledUserInfo = styled(UserInfo)`
  border-bottom: 1px solid ${LIGHT_GRAY};
  padding-bottom: 20px;
  margin-bottom: 20px;
  text-align: center;
`

const SnsPage = () => {
  const router = useRouter()
  const { userId: userIdFromQuery } = router.query
  const userId = userIdFromQuery
    ? getSafeNumberFromQuery(userIdFromQuery)
    : undefined

  const { me } = useAuth()

  const handleSnsPostCreateButtonClick = () => {
    router.push(`/sns/post/posting`)
  }

  const isMySnsPage = me?.id === userId

  return (
    <SnsPageHeadContents>
      <MaxWidthContainer>
        <StyledSnsPageWrapper>
          {userId && (
            <>
              <StyledUserInfo userId={userId} />
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
        </StyledSnsPageWrapper>
      </MaxWidthContainer>
    </SnsPageHeadContents>
  )
}

export default withHeader(SnsPage)
