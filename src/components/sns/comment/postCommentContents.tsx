import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'
import withLogin from 'hocs/withLogin'
import PostCommentWritingArea from 'components/sns/comment/postCommentWritingArea'
import PostCommentList from 'components/sns/comment/postCommentList'
import createUrlQuery from 'utils/createUrlQuery'

const PostCommentWritingAreaWithLogin = withLogin(PostCommentWritingArea)

const PostCommentContents = () => {
  const router = useRouter()
  const { snsPostId } = router.query

  const { mutate } = useSWRConfig()

  const query = createUrlQuery({
    'populate[0]': 'author',
    'populate[1]': 'author.profileImage',
    'filters[post][id][$eq]': `${snsPostId}`,
    sort: 'createdAt:asc',
  })

  const refetch = () => {
    mutate({ url: `/api/sns-comments?${query}` })
  }

  const afterPostCommentSubmit = () => {
    refetch()
  }

  return (
    <>
      <PostCommentWritingAreaWithLogin
        snsPostId={snsPostId}
        afterPostCommentSubmit={afterPostCommentSubmit}
      />
      <PostCommentList snsPostId={snsPostId} />
    </>
  )
}

export default PostCommentContents
