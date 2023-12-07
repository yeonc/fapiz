import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'

type createFashionItemArgs = {
  category: string
  color: string
  imageId: number
  ownerId: number
}
type CreateFashionitem = (args: createFashionItemArgs) => Promise<AxiosResponse>

const createFashionItem: CreateFashionitem = async ({
  category,
  color,
  imageId,
  ownerId,
}) => {
  return axios({
    method: 'post',
    url: `${BACKEND_URL}/api/fashion-items`,
    data: {
      data: {
        category,
        color,
        image: imageId,
        owner: ownerId,
      },
    },
  })
}

export default createFashionItem
