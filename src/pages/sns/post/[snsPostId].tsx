import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import styled from '@emotion/styled'
import SnsPostPageWithoutLogin from 'components/sns/post/page/snsPostPageWithoutLogin'
import OtherSnsPostPage from 'components/sns/post/page/otherSnsPostPage'
import MySnsPostPage from 'components/sns/post/page/mySnsPostPage'
import MaxWidthContainer from 'components/layouts/containers/maxWidthContainer'
import useSnsPost from 'hooks/useSnsPost'
import {
  SnsPostResponseAboutDefaultQuery,
  SnsPostResponseAboutPostDetail,
} from 'types/snsPost'
import getSafeNumberFromQuery from 'utils/getSafeNumberFromQuery'
import { useAuth } from 'context/AuthContext'
import SnsPageHeadContents from 'components/sns/page/snsPageHeadContents'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { SWRConfig, unstable_serialize } from 'swr'
import fetchPost from 'services/snsPost/fetchPost'
import createUrlQuery from 'utils/createUrlQuery'
import fetchPostComments from 'services/snsComment/fetchPostComments'
import { PostCommentResponse } from 'types/postComment'

const StyledSnsPostPageWrapper = styled.div`
  padding: 20px 0;
  width: 90%;
  margin: 0 auto;
`

type Key = string
type FallbackValue = SnsPostResponseAboutPostDetail | PostCommentResponse[] | {}
type Fallback = Record<Key, FallbackValue>
type SnsPostPageProps = {
  fallback: Fallback
}

const SnsPostPage = ({ fallback }: SnsPostPageProps) => {
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

  if (!isLoggedIn) {
    return (
      <SnsPageHeadContents>
        <MaxWidthContainer>
          <StyledSnsPostPageWrapper>
            <SWRConfig value={{ fallback }}>
              <SnsPostPageWithoutLogin />
            </SWRConfig>
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
            <SWRConfig value={{ fallback }}>
              <MySnsPostPage />
            </SWRConfig>
          </StyledSnsPostPageWrapper>
        </MaxWidthContainer>
      </SnsPageHeadContents>
    )
  }

  return (
    <SnsPageHeadContents>
      <MaxWidthContainer>
        <StyledSnsPostPageWrapper>
          <SWRConfig value={{ fallback }}>
            <OtherSnsPostPage />
          </SWRConfig>
        </StyledSnsPostPageWrapper>
      </MaxWidthContainer>
    </SnsPageHeadContents>
  )
}

export default withHeader(SnsPostPage)

const queryForFetchingSnsPost = createUrlQuery({
  'populate[0]': 'author.profileImage',
  'populate[1]': 'likeUsers',
  'populate[2]': 'bookmarkUsers',
  'populate[3]': 'postImages',
})

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<SnsPostPageProps>> => {
  const { snsPostId: postIdFromQuery } = context.query
  const postId = postIdFromQuery
    ? getSafeNumberFromQuery(postIdFromQuery)
    : undefined
  const postKey = unstable_serialize({
    url: `/api/sns-posts/${postId}?${queryForFetchingSnsPost}`,
  })
  const queryForPostComments = createUrlQuery({
    'populate[0]': 'author',
    'populate[1]': 'author.profileImage',
    'filters[post][id][$eq]': `${postId}`,
    sort: 'createdAt:desc',
  })
  const postCommentsKey = unstable_serialize({
    url: `/api/sns-comments?${queryForPostComments}`,
  })

  try {
    const postRes = await fetchPost(postId!)
    const postCommentsRes = await fetchPostComments(postId!)
    const post = postRes.data
    const postComments = postCommentsRes.data

    return {
      props: {
        fallback: {
          [postKey]: post,
          [postCommentsKey]: postComments,
        },
      },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}
