import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'

const deleteFashionItem = async (
  fashionItemId: number
): Promise<AxiosResponse> => {
  return axios({
    method: 'delete',
    url: `${BACKEND_URL}/api/fashion-items/${fashionItemId}`,
  })
}

export default deleteFashionItem
