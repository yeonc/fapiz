import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'
import { Id } from 'types/common'

type DeleteBookmarkArgs = {
  targetPostId: Id
  myId: Id
  bookmarkUserIds: Id[]
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
