import { useSWRConfig } from 'swr'
import withHeader from 'hocs/withHeader'
import withLogin from 'hocs/withLogin'
import { css } from '@emotion/react'
import ImageList from '@mui/material/ImageList'
import LikeButton from 'components/common/buttons/likeButton'
import ImageCardItem from 'components/home/imageCardItem'
import useMe from 'hooks/useMe'
import useSnsPostInfiniteScroll from 'hooks/useSnsPostInfiniteScroll'
import createUrlQuery from 'utils/createUrlQuery'
import { DEFAULT_WHITE } from 'styles/constants/color'

const INITIAL_PAGE_NUMBER = 1
const PAGE_SIZE = 20

const query = createUrlQuery({
  'populate[0]': 'postImages',
  'populate[1]': 'likeUsers',
  'populate[2]': 'author',
  'pagination[limit]': 200,
})

const loadingTextStyle = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
`

const fetchTriggerStyle = css`
  visibility: hidden;
`

const SnsPostLikeButtonWithLogin = withLogin(LikeButton)

const MainPage = () => {
  const { me } = useMe()

  const { snsPosts, isSnsPostsLoading, fetchTriggerRef } =
    useSnsPostInfiniteScroll({
      initialPageNumber: INITIAL_PAGE_NUMBER,
      pageSize: PAGE_SIZE,
      isLoggedIn: me && !!me,
      myGender: me?.gender,
      myBodyShape: me?.bodyShape,
      myFashionStyles: me?.fashionStyles,
    })

  const { mutate } = useSWRConfig()

  const refetch = () => mutate({ url: `/api/sns-posts?${query}` })

  const afterLike = () => {
    refetch()
  }

  return (
    <>
      <ImageList variant="masonry" cols={3}>
        {snsPosts.map(snsPost => {
          return (
            <ImageCardItem
              key={snsPost.id}
              cardItemData={snsPost}
              rightActionButton={
                <SnsPostLikeButtonWithLogin
                  myId={me?.id}
                  targetId={snsPost.id}
                  likeUsers={snsPost.likeUsers}
                  afterLike={afterLike}
                  isShowLikeUsersNumber={false}
                  borderColor={DEFAULT_WHITE}
                />
              }
            />
          )
        })}
      </ImageList>
      <span ref={fetchTriggerRef} css={fetchTriggerStyle}>
        trigger
      </span>
      {isSnsPostsLoading && <p css={loadingTextStyle}>loading...</p>}
    </>
  )
}

export default withHeader(MainPage)
