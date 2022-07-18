import withHeader from 'hocs/withHeader'
import PostDescriptionContents from 'components/sns/postDescriptionContents'
import PostCommentContents from 'components/sns/comment/postCommentContents'

// TODO: SNSPostPage 컴포넌트 나누기
// (1. 로그인 안 한 경우 2. 로그인 했는데 작성자인 경우 3. 로그인 했는데 작성자 아닌 경우)
const SnsPostPage = () => (
  <>
    <PostDescriptionContents />
    <PostCommentContents />
  </>
)

export default withHeader(SnsPostPage)
