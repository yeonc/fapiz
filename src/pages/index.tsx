import Head from 'next/head'
import withHeader from 'hocs/withHeader'
import withLogin from 'hocs/withLogin'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import ImageList from '@mui/material/ImageList'
import LikeButtonForHomePage from 'components/home/likeButtonForHomePage'
import ImageCardItem from 'components/home/imageCardItem'
import MaxWidthContainer from 'components/layouts/containers/maxWidthContainer'
import useSnsPostInfiniteScroll from 'hooks/useSnsPostInfiniteScroll'
import { DEFAULT_WHITE } from 'styles/constants/color'
import { useAuth } from 'context/AuthContext'
import { SnsPostForHomePage } from './api/filtered-sns-posts'
import fetchMe from 'services/auth/fetchMe'
import paginateData from 'utils/paginateData'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import getFilteredSnsPosts from 'services/snsPost/getFilteredSnsPosts'

const INITIAL_PAGE_NUMBER = 1
const PAGE_SIZE = 20

const StyledHomePageWrapper = styled.div`
  padding: 30px 0;
`

const fetchTriggerStyle = css`
  display: block;
  height: 1px;
`

const SnsPostLikeButtonWithLogin = withLogin(LikeButtonForHomePage)

export type FilteredPosts = {
  initialPosts: SnsPostForHomePage[]
  total: number
}
type HomePageProps = {
  filteredPosts: FilteredPosts
}

const HomePage = ({ filteredPosts }: HomePageProps) => {
  const { me } = useAuth()

  const { snsPosts, fetchTriggerRef } = useSnsPostInfiniteScroll({
    initialPageNumber: INITIAL_PAGE_NUMBER,
    pageSize: PAGE_SIZE,
    isLoggedIn: !!me,
    myGender: me?.gender || null,
    myBodyShape: me?.bodyShape || null,
    myFashionStyles: me?.fashionStyles || null,
    filteredPosts,
  })

  return (
    <>
      <Head>
        <title>Fapiz</title>
        <meta name="description" content="패션 공유 SNS & 나의 온라인 옷장" />
      </Head>
      <MaxWidthContainer>
        <StyledHomePageWrapper>
          <ImageList variant="masonry" cols={3}>
            {snsPosts.map(snsPost => (
              <ImageCardItem
                key={snsPost.id}
                cardItemData={snsPost}
                rightActionButton={
                  me && (
                    <SnsPostLikeButtonWithLogin
                      myId={me.id}
                      targetId={snsPost.id}
                      likeUsers={snsPost.likeUsers}
                      isShowLikeUsersNumber={false}
                      borderColor={DEFAULT_WHITE}
                    />
                  )
                }
              />
            ))}
          </ImageList>
          <span ref={fetchTriggerRef} css={fetchTriggerStyle}></span>
        </StyledHomePageWrapper>
      </MaxWidthContainer>
    </>
  )
}

export default withHeader(HomePage)

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<HomePageProps>> => {
  const jwt = context.req.cookies.jwt
  try {
    let me
    if (!!jwt) {
      const authRes = await fetchMe(jwt)
      me = authRes.data
    } else {
      me = null
    }

    const filteredSnsPostsByMyInfo = await getFilteredSnsPosts({
      isLoggedIn: !!me,
      myGender: me?.gender || null,
      myBodyShape: me?.bodyShape || null,
      myFashionStyles: me?.fashionStyles || null,
    })

    const total = filteredSnsPostsByMyInfo.length

    const initialPosts = paginateData({
      dataArray: filteredSnsPostsByMyInfo,
      pageNumber: INITIAL_PAGE_NUMBER,
      pageSize: PAGE_SIZE,
    })

    return {
      props: {
        filteredPosts: {
          initialPosts,
          total,
        },
      },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}
