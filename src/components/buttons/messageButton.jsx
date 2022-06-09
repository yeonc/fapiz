import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import useUser from 'hooks/useUser'

const MessageButton = () => {
  const router = useRouter()
  const { userId } = router.query

  const { user, isLoading, isError } = useUser(userId)

  if (isLoading) {
    return <p>로딩중...</p>
  }

  if (isError) {
    return <p>에러가 발생했습니다. 홈으로 돌아가세요</p>
  }

  const goToChatRoom = () => {
    router.push(`/chat-room/${user.id}`)
  }

  return <Button onClick={goToChatRoom}>메시지</Button>
}

export default MessageButton
