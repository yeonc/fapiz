import { useSWRConfig } from 'swr'
import withHeader from 'hocs/withHeader'
import withLogin from 'hocs/withLogin'
import { css } from '@emotion/react'
import ImageList from '@mui/material/ImageList'
import LikeButton from 'components/common/buttons/likeButton'
import ImageCardItem from 'components/home/imageCardItem'
import useMe from 'hooks/useMe'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import createUrlQuery from 'utils/createUrlQuery'

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

const SnsPostLikeButtonWithLogin = withLogin(LikeButton)

const MainPage = () => {
  const { snsPostsToShow, isSnsPostsLoading, lastSnsPostRef } =
    useInfiniteScroll({
      initialPageNumber: INITIAL_PAGE_NUMBER,
      pageSize: PAGE_SIZE,
    })

  const { me } = useMe()
  const { mutate } = useSWRConfig()

  const refetch = () => mutate({ url: `/api/sns-posts?${query}` })

  const afterLike = () => {
    refetch()
  }

  return (
    <>
      <ImageList variant="masonry" cols={3}>
        {snsPostsToShow.map((snsPost, snsPostIndex) => {
          const snsPostsLastIndex = snsPostsToShow.length - 1
          const hasSnsPostLastIndex = snsPostIndex === snsPostsLastIndex

          return (
            <ImageCardItem
              ref={hasSnsPostLastIndex ? lastSnsPostRef : undefined}
              key={snsPost.id}
              cardItemData={snsPost}
              rightActionButton={
                <SnsPostLikeButtonWithLogin
                  myId={me?.id}
                  targetId={snsPost.id}
                  likeUsers={snsPost.likeUsers}
                  afterLike={afterLike}
                  isShowLikeUsersNumber={false}
                />
              }
            />
          )
        })}
      </ImageList>
      {isSnsPostsLoading && <p css={loadingTextStyle}>loading...</p>}
    </>
  )
}

export default withHeader(MainPage)
