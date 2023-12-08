import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'
import { Id } from 'types/common'

type createFashionItemArgs = {
  category: string
  color: string
  imageId: Id
  ownerId: Id
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
