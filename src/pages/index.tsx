import { useRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'
import withHeader from 'hocs/withHeader'
import withLogin from 'hocs/withLogin'
import { css } from '@emotion/react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import LikeButton from 'components/common/buttons/likeButton'
import useMe from 'hooks/useMe'
import createUrlQuery from 'utils/createUrlQuery'
import ROUTE_URL from 'constants/routeUrl'
import { SnsPostForMainPage } from 'types/snsPost'

const queryForFetchingSnsPosts = createUrlQuery({
  'populate[0]': 'postImages',
  'populate[1]': 'likeUsers',
  'populate[2]': 'author',
  'pagination[limit]': 200,
})

const mutateKeyForFetchingSnsPosts = {
  url: `/api/sns-posts?${queryForFetchingSnsPosts}`,
}

const cursorPointer = css`
  cursor: pointer;
`

const SnsPostLikeButtonWithLogin = withLogin(LikeButton)

const ImageCardItem = ({ cardItemData, rightActionButton }) => {
  const router = useRouter()

  const goToSnsPost = (snsPostId: number) =>
    router.push(`/sns/post/${snsPostId}`)

  const handleImageListItemClick = (e: any) => {
    const isLikeButtonClicked = e.target.id === LikeButton.id
    if (isLikeButtonClicked) {
      return
    }

    goToSnsPost(cardItemData.id)
  }

  return (
    <ImageListItem onClick={handleImageListItemClick} css={cursorPointer}>
      <img
        src={cardItemData.postImage.url}
        alt={cardItemData.postImage.altText}
      />
      <ImageListItemBar
        title={cardItemData.author.username}
        position="top"
        actionIcon={rightActionButton}
        actionPosition="right"
      />
    </ImageListItem>
  )
}

const MainPage = () => {
  const { mutate } = useSWRConfig()

  const afterLike = () => {
    mutate(mutateKeyForFetchingSnsPosts)
  }

  const { me } = useMe()

  const myFashionStyles = [
    {
      id: 7,
      name: '모던',
    },
    {
      id: 11,
      name: '아메카지',
    },
  ]
  const myFashionStylesString = JSON.stringify(myFashionStyles)
  const encodedMyFashionStyles = encodeURIComponent(myFashionStylesString)

  const { data: snsPostsToShow, error } = useSWR<SnsPostForMainPage[]>({
    baseURL: ROUTE_URL.HOME,
    url: '/api/filtered-sns-posts',
    config: {
      params: {
        pageNumber: 1,
        pageSize: 20,
        isLoggedIn: false,
        myGender: '남',
        myBodyShape: '역삼각형',
        myFashionStyles: encodedMyFashionStyles,
      },
    },
  })

  if (error) {
    return <p>에러가 발생했습니다.</p>
  }

  if (!snsPostsToShow) {
    return <p>포스트 로딩 중..</p>
  }

  return (
    <ImageList variant="masonry" cols={3}>
      {snsPostsToShow.map(snsPost => (
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
            />
          }
        />
      ))}
    </ImageList>
  )
}

export default withHeader(MainPage)
