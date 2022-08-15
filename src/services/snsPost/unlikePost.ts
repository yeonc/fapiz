import axios from 'axios'
import { BACKEND_URL } from 'constants/constants'

type UnlikePostArgs = {
  snsPostId: number
  likePostUserIds: number[]
  unlikeUserId: number
}

type UnlikePost = (args: UnlikePostArgs) => Promise<void>

// TODO: unlikePost 함수를 구현할 수 있는 더 좋은 방법 고민해 보기
const unlikePost: UnlikePost = async ({
  snsPostId,
  likePostUserIds,
  unlikeUserId,
}) => {
  const url = `${BACKEND_URL}/api/sns-posts/${snsPostId}`

  // 1. SNS 게시물을 좋아요 한 유저들을 전부 삭제함
  // (likeUsers: SNS 게시물을 좋아요 한 유저 id의 배열 - relation data)
  axios({
    method: 'put',
    url,
    data: {
      data: {
        likeUsers: null,
      },
    },
  })
    // 2. 첫 번째 put 요청에서 에러 발생 시, likeUsers를 원래 들어있던 데이터로 복구해 줌
    .catch(() => {
      axios({
        method: 'put',
        url,
        data: {
          data: {
            likeUsers: likePostUserIds,
          },
        },
      })
    })
    // 3. 첫 번째 put 요청이 성공했다면, SNS 게시물을 좋아요 한 유저들의 id 배열(함수의 인자로 들어온 값)에서 좋아요를 취소한 유저의 id만 제외한 새로운 배열을 likeUsers에 넣어줌
    .then(() => {
      return axios({
        method: 'put',
        url,
        data: {
          data: {
            likeUsers: likePostUserIds.filter(id => id !== unlikeUserId),
          },
        },
      })
    })
}

export default unlikePost
