import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import useGetRequest from 'hooks/useGetRequest'
import { BACKEND_URL } from 'constants/constants'

const SnsPostPage = () => {
  const router = useRouter()
  const { snsPostId } = router.query
  const { response, error, loading } = useGetRequest(
    BACKEND_URL,
    `/api/sns-posts/${snsPostId}`
  )

  if (loading) {
    return <p>로딩중...</p>
  }

  if (error) {
    return <p>에러가 발생했습니다. 홈으로 돌아가세요</p>
  }

  const snsPost = response.data

  return (
    <>
      <h1>PostId: {snsPost.data.id} </h1>
      <p>content: {snsPost.data.attributes.content}</p>
    </>
  )
}

export default withHeader(SnsPostPage)
