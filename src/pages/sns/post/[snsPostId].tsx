import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import styled from '@emotion/styled'
import SnsPostPageWithoutLogin from 'components/sns/post/page/snsPostPageWithoutLogin'
import OtherSnsPostPage from 'components/sns/post/page/otherSnsPostPage'
import MySnsPostPage from 'components/sns/post/page/mySnsPostPage'
import MaxWidthContainer from 'components/layouts/containers/maxWidthContainer'
import useMe from 'hooks/useMe'
import useSnsPost from 'hooks/useSnsPost'
import { User } from 'types/user'
import { SnsPostResponseAboutDefaultQuery } from 'types/snsPost'
import getSafeNumberFromQuery from 'utils/getSafeNumberFromQuery'

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
  const { me } = useMe<User>()

  const isLoggedIn = !!me
  const snsPostAuthorId = snsPost?.attributes.author.data.id
  const isMySnsPostPage = me?.id === snsPostAuthorId

  if (!snsPost) {
    return null
  }

  if (!isLoggedIn) {
    return (
      <MaxWidthContainer>
        <StyledSnsPostPageWrapper>
          <SnsPostPageWithoutLogin />
        </StyledSnsPostPageWrapper>
      </MaxWidthContainer>
    )
  }

  if (isMySnsPostPage) {
    return (
      <MaxWidthContainer>
        <StyledSnsPostPageWrapper>
          <MySnsPostPage />
        </StyledSnsPostPageWrapper>
      </MaxWidthContainer>
    )
  }

  return (
    <MaxWidthContainer>
      <StyledSnsPostPageWrapper>
        <OtherSnsPostPage />
      </StyledSnsPostPageWrapper>
    </MaxWidthContainer>
  )
}

export default withHeader(SnsPostPage)
