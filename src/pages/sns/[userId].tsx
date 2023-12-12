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
import { SWRConfig, unstable_serialize } from 'swr'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import createUrlQuery from 'utils/createUrlQuery'
import { UserResponseWithAdditionalFields } from 'types/user'
import { SnsPostResponseAboutShowingAll } from 'types/snsPost'
import fetchUser from 'services/user/fetchUser'
import fetchPosts from 'services/snsPost/fetchPosts'

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

type Key = string
type FallbackValue =
  | UserResponseWithAdditionalFields
  | SnsPostResponseAboutShowingAll[]
  | {}
type Fallback = Record<Key, FallbackValue>
type SnsPageProps = {
  fallback: Fallback
}

const SnsPage = ({ fallback }: SnsPageProps) => {
  const router = useRouter()
  const { userId: userIdFromQuery } = router.query
  const userId = userIdFromQuery
    ? getSafeNumberFromQuery(userIdFromQuery)
    : undefined
  const { me } = useAuth()

  const handleSnsPostCreateButtonClick = () => router.push(`/sns/post/posting`)

  const isMySnsPage = me?.id === userId

  return (
    <SnsPageHeadContents>
      <MaxWidthContainer>
        <StyledSnsPageWrapper>
          {userId && (
            <SWRConfig value={{ fallback }}>
              <StyledUserInfo userId={userId} />
              <SnsPosts userId={userId} />
            </SWRConfig>
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

const queryForUser = createUrlQuery({
  'populate[0]': 'profileImage',
  'populate[1]': 'followers.profileImage',
  'populate[2]': 'followings.profileImage',
  'populate[3]': 'followers.followers',
  'populate[4]': 'followings.followers',
})

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<SnsPageProps>> => {
  const { userId: userIdFromQuery } = context.query
  const userId = userIdFromQuery
    ? getSafeNumberFromQuery(userIdFromQuery)
    : undefined
  const userKey = unstable_serialize({
    url: `/api/users/${userId}?${queryForUser}`,
  })
  const queryForPosts = createUrlQuery({
    populate: '*',
    'filters[author][id][$eq]': userId,
    sort: 'createdAt:desc',
  })
  const postsKey = unstable_serialize({
    url: `/api/sns-posts?${queryForPosts}`,
  })

  try {
    const userRes = await fetchUser(userId!)
    const postsRes = await fetchPosts(userId!)
    const user = userRes.data
    const posts = postsRes.data

    return {
      props: {
        fallback: {
          [userKey]: user,
          [postsKey]: posts,
        },
      },
    }
  } catch {
    return {
      props: {
        fallback: {
          [userKey]: {},
          [postsKey]: [],
        },
      },
    }
  }
}
