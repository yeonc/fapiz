import withHeader from 'hocs/withHeader'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const ImageCardItems = ({ items }) => {
  return items.map(item => (
    <ImageListItem key={item.img}>
      <img src={item.img} alt={item.title} />
      <ImageListItemBar
        title={item.title}
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

const MainPage = () => (
  <>
    <ImageList variant="masonry" cols={3}>
      <ImageCardItems items={itemData} />
    </ImageList>
  </>
)

const itemData = [
  {
    img: 'https://cdn.pixabay.com/photo/2022/05/06/13/11/lake-7178316_960_720.jpg',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2022/05/24/09/48/sky-7218043_960_720.jpg',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2021/08/22/06/24/bird-6564285_960_720.jpg',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2022/04/05/05/54/pop-7112848_960_720.png',
    title: 'Fern',
    author: '@katie_wasserman',
  },
]

export default withHeader(MainPage)
