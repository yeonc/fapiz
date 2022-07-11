import withHeader from 'hocs/withHeader'
import PostDescriptionContents from 'components/sns/postDescriptionContents'
import PostCommentContents from 'components/sns/comment/postCommentContents'

const SnsPostPage = () => (
  <>
    <PostDescriptionContents />
    <PostCommentContents />
  </>
)

export default withHeader(SnsPostPage)
