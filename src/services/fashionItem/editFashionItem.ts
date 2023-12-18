import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'
import { Id } from 'types/common'

type EditFashionItemArgs = {
  fashionItemId: Id
  category: string
  color: string
  imageId?: Id
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
