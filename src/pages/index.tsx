import { useSWRConfig } from 'swr'
import withHeader from 'hocs/withHeader'
import withLogin from 'hocs/withLogin'
import ImageList from '@mui/material/ImageList'
import LikeButton from 'components/common/buttons/likeButton'
import useMe from 'hooks/useMe'
import useFilteredSnsPosts from 'hooks/useFilteredSnsPosts'
import createUrlQuery from 'utils/createUrlQuery'
import ImageCardItem from 'components/home/imageCardItem'

const query = createUrlQuery({
  'populate[0]': 'postImages',
  'populate[1]': 'likeUsers',
  'populate[2]': 'author',
  'pagination[limit]': 200,
})

const SnsPostLikeButtonWithLogin = withLogin(LikeButton)

const MainPage = () => {
  const { mutate } = useSWRConfig()

  const refetch = () => mutate({ url: `/api/sns-posts?${query}` })

  const afterLike = () => {
    refetch()
  }

  const { me } = useMe()

  const { filteredSnsPosts, error } = useFilteredSnsPosts()

  if (error) {
    return <p>에러가 발생했습니다.</p>
  }

  if (!filteredSnsPosts) {
    return <p>포스트 로딩 중..</p>
  }

  return (
    <ImageList variant="masonry" cols={3}>
      {filteredSnsPosts.map(snsPost => (
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
