import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'

type DeleteBookmarkArgs = {
  targetPostId: number
  myId: number
  bookmarkUserIds: number[]
}

type DeleteBookmark = (args: DeleteBookmarkArgs) => Promise<AxiosResponse>

const deleteBookmark: DeleteBookmark = async ({
  targetPostId,
  myId,
  bookmarkUserIds,
}) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/sns-posts/${targetPostId}`,
    data: {
      data: {
        bookmarkUsers: bookmarkUserIds.filter(userId => userId !== myId),
      },
    },
  })
}

export default deleteBookmark
