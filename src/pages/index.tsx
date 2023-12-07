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

const HomePage = () => {
  const { me } = useAuth()

  const { snsPosts, fetchTriggerRef } = useSnsPostInfiniteScroll({
    initialPageNumber: INITIAL_PAGE_NUMBER,
    pageSize: PAGE_SIZE,
    isLoggedIn: !!me,
    myGender: me?.gender || null,
    myBodyShape: me?.bodyShape || null,
    myFashionStyles: me?.fashionStyles || null,
  })

  return (
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
  )
}

export default withHeader(HomePage)
