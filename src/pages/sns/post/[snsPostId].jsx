import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import useGetRequest from 'hooks/useGetRequest'
import { BACKEND_URL } from 'constants/constants'

const SnsPostPage = () => {
  const [snsPost, setSnsPost] = useState()

  const router = useRouter()
  const { snsPostId } = router.query
  const { response } = useGetRequest(BACKEND_URL, `/api/sns-posts/${snsPostId}`)

  useEffect(() => {
    if (response !== null) {
      setSnsPost(response.data)
    }
  }, [response])

  console.log(snsPost)

  return (
    <>
      <h1>PostId: {snsPost?.data?.id} </h1>
      <p>content: {snsPost?.data?.attributes.content}</p>
    </>
  )
}

export default withHeader(SnsPostPage)
