import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import withHeader from 'hocs/withHeader'
import { BACKEND_URL } from 'constants/constants'

const fetcher = url => axios.get(url).then(res => res.data)

const SnsPostPage = () => {
  const router = useRouter()
  const { snsPostId } = router.query

  const { data: response, error } = useSWR(
    `${BACKEND_URL}/api/sns-posts/${snsPostId}`,
    fetcher
  )
  const loading = !response && !error

  if (loading) {
    return <p>로딩중...</p>
  }

  if (error) {
    return <p>에러가 발생했습니다. 홈으로 돌아가세요</p>
  }

  const snsPost = response?.data

  return (
    <>
      <h1>PostId: {snsPost?.id} </h1>
      <p>content: {snsPost?.attributes.content}</p>
    </>
  )
}

export default withHeader(SnsPostPage)
