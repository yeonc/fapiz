import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

// TODO: deleteBookmark 함수를 구현할 수 있는 더 좋은 방법 고민해 보기
const deleteBookmark = async ({
  snsPostId,
  bookmarkUserIds,
  deleteBookmarkUserId,
}) => {
  const url = `${BACKEND_URL}/api/sns-posts/${snsPostId}`

  // 1. SNS 게시물을 북마크 한 유저들을 전부 삭제함
  // (bookmarkUsers: SNS 게시물을 북마크 한 유저 id의 배열 - relation data)
  axios({
    method: 'put',
    url,
    data: {
      data: {
        bookmarkUsers: null,
      },
    },
  })
    // 2. 첫 번째 put 요청에서 에러 발생 시, bookmarkUsers를 원래 들어있던 데이터로 복구해 줌
    .catch(() => {
      axios({
        method: 'put',
        url,
        data: {
          data: {
            bookmarkUsers: bookmarkUserIds,
          },
        },
      })
    })
    // 3. 첫 번째 put 요청이 성공했다면, SNS 게시물을 북마크 한 유저들의 id 배열(함수의 인자로 들어온 값)에서 북마크를 취소한 유저의 id만 제외한 새로운 배열을 bookmarkUsers에 넣어줌
    .then(() => {
      return axios({
        method: 'put',
        url,
        data: {
          data: {
            bookmarkUsers: bookmarkUserIds.filter(
              id => id !== deleteBookmarkUserId
            ),
          },
        },
      })
    })
}

export default deleteBookmark
