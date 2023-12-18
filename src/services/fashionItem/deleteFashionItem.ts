import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'
import { Id } from 'types/common'

const deleteFashionItem = async (fashionItemId: Id): Promise<AxiosResponse> => {
  return axios({
    method: 'delete',
    url: `${BACKEND_URL}/api/fashion-items/${fashionItemId}`,
  })
}

export default deleteFashionItem
