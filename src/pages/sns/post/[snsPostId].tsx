import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import styled from '@emotion/styled'
import SnsPostPageWithoutLogin from 'components/sns/post/page/snsPostPageWithoutLogin'
import OtherSnsPostPage from 'components/sns/post/page/otherSnsPostPage'
import MySnsPostPage from 'components/sns/post/page/mySnsPostPage'
import MaxWidthContainer from 'components/layouts/containers/maxWidthContainer'
import useSnsPost from 'hooks/useSnsPost'
import { SnsPostResponseAboutDefaultQuery } from 'types/snsPost'
import getSafeNumberFromQuery from 'utils/getSafeNumberFromQuery'
import { useAuth } from 'context/AuthContext'
import SnsPageHeadContents from 'components/sns/page/snsPageHeadContents'

const StyledSnsPostPageWrapper = styled.div`
  padding: 20px 0;
  width: 90%;
  margin: 0 auto;
`

const SnsPostPage = () => {
  const router = useRouter()
  const { snsPostId: snsPostIdFromQuery } = router.query
  const snsPostId = snsPostIdFromQuery
    ? getSafeNumberFromQuery(snsPostIdFromQuery)
    : undefined
  const { snsPost } = useSnsPost<SnsPostResponseAboutDefaultQuery>(
    snsPostId || undefined
  )
  const { me } = useAuth()

  const isLoggedIn = !!me
  const snsPostAuthorId = snsPost?.attributes.author.data.id
  const isMySnsPostPage = me?.id === snsPostAuthorId

  if (!snsPost) {
    return null
  }

  if (!isLoggedIn) {
    return (
      <SnsPageHeadContents>
        <MaxWidthContainer>
          <StyledSnsPostPageWrapper>
            <SnsPostPageWithoutLogin />
          </StyledSnsPostPageWrapper>
        </MaxWidthContainer>
      </SnsPageHeadContents>
    )
  }

  if (isMySnsPostPage) {
    return (
      <SnsPageHeadContents>
        <MaxWidthContainer>
          <StyledSnsPostPageWrapper>
            <MySnsPostPage />
          </StyledSnsPostPageWrapper>
        </MaxWidthContainer>
      </SnsPageHeadContents>
    )
  }

  return (
    <SnsPageHeadContents>
      <MaxWidthContainer>
        <StyledSnsPostPageWrapper>
          <OtherSnsPostPage />
        </StyledSnsPostPageWrapper>
      </MaxWidthContainer>
    </SnsPageHeadContents>
  )
}

export default withHeader(SnsPostPage)
