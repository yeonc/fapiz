import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

// TODO: unfollow를 구현할 수 있는 더 좋은 방법 고민해 보기
const unfollow = async ({ myId, targetUserId, myFollowingUserIds }) => {
  const url = `${BACKEND_URL}/api/users/${myId}`

  // 1. 내가 팔로우 중인 유저들을 전부 삭제함
  // (following: 내가 팔로우 중인 유저 id의 배열 - relation data)
  axios({
    method: 'put',
    url,
    data: {
      following: null,
    },
  })
    // 2. 첫 번째 put 요청에서 에러 발생 시, following을 원래 들어있던 데이터로 복구해 줌
    .catch(() => {
      axios({
        method: 'put',
        url,
        data: {
          following: myFollowingUserIds,
        },
      })
    })
    // 3. 첫 번째 put 요청이 성공했다면, 내가 팔로우 중인 유저들의 id 배열(함수의 인자로 들어온 값)에서 언팔로우한 유저의 id만 제외한 새로운 배열을 following에 넣어줌
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
