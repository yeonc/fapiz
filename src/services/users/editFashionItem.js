import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const editFashionItem = ({
  fashionItemId,
  season,
  category,
  color,
  imageId,
}) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/fashion-items/${fashionItemId}`,
    data: {
      data: {
        season,
        category,
        color,
        image: imageId,
      },
    },
  })
}

export default editFashionItem
