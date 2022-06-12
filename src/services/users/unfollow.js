import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

// TODO: unfollow를 구현할 수 있는 더 좋은 방법 고민해 보기
const unfollow = async ({ myId, targetUserId, myFollowingUserIds }) => {
  const url = `${BACKEND_URL}/api/users/${myId}`

  axios({
    method: 'put',
    url,
    data: {
      following: null,
    },
  })
    // 첫 번째 put 요청에서 에러 발생 시 following 데이터 복구
    .catch(() => {
      axios({
        method: 'put',
        url,
        data: {
          following: myFollowingUserIds,
        },
      })
    })
    .then(() => {
      return axios({
        method: 'put',
        url,
        data: {
          following: myFollowingUserIds.filter(id => id !== targetUserId),
        },
      })
    })
}

export default unfollow
