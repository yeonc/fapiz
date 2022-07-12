import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

const deleteFashionItem = async fashionItemId => {
  return axios({
    method: 'delete',
    url: `${BACKEND_URL}/api/fashion-items/${fashionItemId}`,
  })
}

export default deleteFashionItem
