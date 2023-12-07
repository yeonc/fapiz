import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'

type EditFashionItemArgs = {
  fashionItemId: number
  category: string
  color: string
  imageId?: number
}

type EditFashionItem = (args: EditFashionItemArgs) => Promise<AxiosResponse>

const editFashionItem: EditFashionItem = async ({
  fashionItemId,
  category,
  color,
  imageId,
}) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/fashion-items/${fashionItemId}`,
    data: {
      data: {
        category,
        color,
        image: imageId,
      },
    },
  })
}

export default editFashionItem
