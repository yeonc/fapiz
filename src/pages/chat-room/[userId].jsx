import withHeader from 'hocs/withHeader'
import { useRouter } from 'next/router'

const ChatRoom = () => {
  const router = useRouter()
  const { userId } = router.query

  return <h1>Chat Room with user id {userId}</h1>
}

export default withHeader(ChatRoom)
