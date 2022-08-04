import withHeader from 'hocs/withHeader'
import { useRouter } from 'next/router'
import useMe from 'hooks/useMe'
import useSnsPost from 'hooks/useSnsPost'
import SnsPostPageWithoutLogin from 'components/sns/post/page/snsPostPageWithoutLogin'
import MySnsPostPage from 'components/sns/post/page/mySnsPostPage'
import OtherSnsPostPage from 'components/sns/post/page/otherSnsPostPage'

const SnsPostPage = () => {
  const router = useRouter()
  const { snsPostId } = router.query

  const { snsPost } = useSnsPost(snsPostId)
  const { me } = useMe()

  const isLoggedIn = !!me
  const snsPostAuthorId = snsPost?.attributes.author.data.id
  const isMySnsPostPage = me?.id === snsPostAuthorId

  if (!snsPost) {
    return null
  }

  if (!isLoggedIn) {
    return <SnsPostPageWithoutLogin />
  }

  if (isMySnsPostPage) {
    return <MySnsPostPage />
  }

  return <OtherSnsPostPage />
}

export default withHeader(SnsPostPage)
