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

const ImageCardItems = ({ cardItemsData }) => {
  const { me, isLoading: isMeLoading } = useMe()

  if (isMeLoading) {
    return <p>내 정보를 받아오는 중입니다.</p>
  }

  const { mutate } = useSWRConfig()

  const afterLike = () => {
    mutate(mutateKeyForFetchingSnsPosts)
  }

  return cardItemsData.map(cardItemData => (
    <ImageListItem key={cardItemData.id}>
      <img src={cardItemData.imageUrl} alt={cardItemData.imageAltText} />
      <ImageListItemBar
        title={cardItemData.author}
        position="top"
        actionIcon={
          <IconButton>
            <LikeButton
              myId={me.id}
              targetForLike={cardItemData.object}
              afterLike={afterLike}
              isShowLikeUsersNumber={false}
            />
          </IconButton>
        }
        actionPosition="right"
      />
    </ImageListItem>
  ))
}

const MainPage = () => {
  const { snsPosts: snsPostsFromStrapi, isLoading: isSnsPostsLoading } =
    useSnsPosts(queryForFetchingSnsPosts)

  if (isSnsPostsLoading) {
    return <p>포스트를 받아오는 중입니다.</p>
  }

  const snsPostsData = snsPostsFromStrapi.map(snsPost => ({
    id: snsPost.id,
    author: snsPost.attributes.author.data.attributes.username,
    imageUrl: BACKEND_URL + snsPost.attributes.postImage.data[0].attributes.url,
    imageAltText:
      snsPost.attributes.postImage.data[0].attributes.alternativeText,
    object: snsPost,
  }))

  return (
    <>
      <ImageList variant="masonry" cols={3}>
        <ImageCardItems cardItemsData={snsPostsData} />
      </ImageList>
    </>
  )
}

export default withHeader(MainPage)
