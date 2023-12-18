import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'
import { Id } from 'types/common'

type CreateBookmarkArgs = {
  targetPostId: Id
  myId: Id
  bookmarkUserIds: Id[]
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
