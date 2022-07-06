import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/constants'

type EditFashionItemProps = {
  fashionItemId: number
  season: string
  category: string
  color: string
  imageId?: number
}

const editFashionItem = async ({
  fashionItemId,
  season,
  category,
  color,
  imageId,
}: EditFashionItemProps): Promise<AxiosResponse> => {
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
