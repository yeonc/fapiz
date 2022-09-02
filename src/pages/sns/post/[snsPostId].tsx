import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import styled from '@emotion/styled'
import SnsPostPageWithoutLogin from 'components/sns/post/page/snsPostPageWithoutLogin'
import OtherSnsPostPage from 'components/sns/post/page/otherSnsPostPage'
import MySnsPostPage from 'components/sns/post/page/mySnsPostPage'
import PageContainer from 'components/layouts/containers/pageContainer'
import useMe from 'hooks/useMe'
import useSnsPost from 'hooks/useSnsPost'

const StyledSnsPostPageWrapper = styled.div`
  padding: 20px 0;
  width: 90%;
  margin: 0 auto;
`

const SnsPostPage = () => {
  const router = useRouter()
  const { snsPostId } = router.query

  const { snsPost } = useSnsPost(Number(snsPostId))
  const { me } = useMe()

  const isLoggedIn = !!me
  const snsPostAuthorId: number = snsPost?.attributes.author.data.id
  const isMySnsPostPage = me?.id === snsPostAuthorId

  if (!snsPost) {
    return null
  }

  if (!isLoggedIn) {
    return (
      <PageContainer>
        <StyledSnsPostPageWrapper>
          <SnsPostPageWithoutLogin />
        </StyledSnsPostPageWrapper>
      </PageContainer>
    )
  }

  if (isMySnsPostPage) {
    return (
      <PageContainer>
        <StyledSnsPostPageWrapper>
          <MySnsPostPage />
        </StyledSnsPostPageWrapper>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <StyledSnsPostPageWrapper>
        <OtherSnsPostPage />
      </StyledSnsPostPageWrapper>
    </PageContainer>
  )
}

export default withHeader(SnsPostPage)
