import withHeader from 'hocs/withHeader'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import useSnsPosts from 'hooks/useSnsPosts'
import createUrlQuery from 'utils/createUrlQuery'
import { BACKEND_URL } from 'constants/constants'

const ImageCardItems = ({ itemsData }) => {
  return itemsData.map(itemData => (
    <ImageListItem key={itemData.id}>
      <img src={itemData.imageUrl} alt={itemData.imageAltText} />
      <ImageListItemBar
        title={itemData.author}
        position="top"
        actionIcon={
          <IconButton>
            <FavoriteBorderIcon color="primary" />
          </IconButton>
        }
        actionPosition="right"
      />
    </ImageListItem>
  ))
}

const query = createUrlQuery({
  'populate[0]': 'postImage',
  'populate[1]': 'likeUsers',
  'populate[2]': 'author',
})

const MainPage = () => {
  const { snsPosts: snsPostsFromStrapi, isLoading } = useSnsPosts(query)

  if (isLoading) {
    return <p>loading...</p>
  }

  const SnsPostsData = snsPostsFromStrapi.map(snsPost => ({
    id: snsPost.id,
    author: snsPost.attributes.author.data.attributes.username,
    imageUrl: BACKEND_URL + snsPost.attributes.postImage.data[0].attributes.url,
    imageAltText:
      snsPost.attributes.postImage.data[0].attributes.alternativeText,
  }))

  return (
    <>
      <ImageList variant="masonry" cols={3}>
        <ImageCardItems itemsData={SnsPostsData} />
      </ImageList>
    </>
  )
}

export default withHeader(MainPage)
