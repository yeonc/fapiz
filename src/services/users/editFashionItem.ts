import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/constants'

type EditFashionItemArgs = {
  fashionItemId: number
  season: string
  category: string
  color: string
  imageId?: number
}

type EditFashionItem = (args: EditFashionItemArgs) => Promise<AxiosResponse>

const editFashionItem: EditFashionItem = async ({
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
