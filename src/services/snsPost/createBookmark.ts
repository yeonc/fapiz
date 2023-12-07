import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'

type CreateBookmarkArgs = {
  targetPostId: number
  myId: number
  bookmarkUserIds: number[]
}

type CreateBookmark = (args: CreateBookmarkArgs) => Promise<AxiosResponse>

const createBookmark: CreateBookmark = async ({
  targetPostId,
  myId,
  bookmarkUserIds,
}) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/sns-posts/${targetPostId}`,
    data: {
      data: {
        bookmarkUsers: [...bookmarkUserIds, myId],
      },
    },
  })
}

export default createBookmark
