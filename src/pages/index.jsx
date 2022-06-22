import withHeader from 'hocs/withHeader'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import LikeButton from 'components/common/buttons/likeButton'
import useSnsPosts from 'hooks/useSnsPosts'
import useMe from 'hooks/useMe'
import createUrlQuery from 'utils/createUrlQuery'
import { BACKEND_URL } from 'constants/constants'
import { useSWRConfig } from 'swr'

const queryForFetchingSnsPosts = createUrlQuery({
  'populate[0]': 'postImage',
  'populate[1]': 'likeUsers',
  'populate[2]': 'author',
})
const mutateKeyForFetchingSnsPosts = {
  url: `/api/sns-posts?${queryForFetchingSnsPosts}`,
}

const ImageCardItem = ({ cardItemData, rightActionButton }) => {
  return (
    <ImageListItem>
      <img src={cardItemData.imageUrl} alt={cardItemData.imageAltText} />
      <ImageListItemBar
        title={cardItemData.author}
        position="top"
        actionIcon={rightActionButton}
        actionPosition="right"
      />
    </ImageListItem>
  )
}

const MainPage = () => {
  const { me } = useMe()
  const { snsPosts: snsPostsFromStrapi, isLoading: isSnsPostsLoading } =
    useSnsPosts(queryForFetchingSnsPosts)

  if (isSnsPostsLoading) {
    return <p>포스트를 받아오는 중입니다.</p>
  }

  const snsPosts = snsPostsFromStrapi.map(snsPost => ({
    id: snsPost.id,
    author: snsPost.attributes.author.data.attributes.username,
    imageUrl: BACKEND_URL + snsPost.attributes.postImage.data[0].attributes.url,
    imageAltText:
      snsPost.attributes.postImage.data[0].attributes.alternativeText,
    object: snsPost,
  }))

  const { mutate } = useSWRConfig()

  const afterLike = () => {
    mutate(mutateKeyForFetchingSnsPosts)
  }

  return (
    <>
      <ImageList variant="masonry" cols={3}>
        {snsPosts.map(snsPost => (
          <ImageCardItem
            key={snsPost.id}
            cardItemData={snsPost}
            rightActionButton={
              !!me ? (
                <IconButton>
                  <LikeButton
                    myId={me.id}
                    targetForLike={snsPost.object}
                    afterLike={afterLike}
                    isShowLikeUsersNumber={false}
                  />
                </IconButton>
              ) : null
            }
          />
        ))}
      </ImageList>
    </>
  )
}

export default withHeader(MainPage)
