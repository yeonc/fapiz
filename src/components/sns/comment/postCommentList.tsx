import styled from '@emotion/styled'
import CommentIcon from '@mui/icons-material/Comment'
import PostCommentItem from 'components/sns/comment/postCommentItem'
import useSnsComments from 'hooks/useSnsComments'
import createUrlQuery from 'utils/createUrlQuery'
import { mgBottom } from 'styles/layout'
import { Nullable } from 'types/common'
import { sanitizePostCommentsForSnsPost } from 'sanitizer/postComments'

const StyledNotExistComment = styled.div`
  padding: 30px;
  text-align: center;
`

const StyledPostCommentItem = styled(PostCommentItem)`
  margin-bottom: 14px;
`

export type PostCommentForSnsPost = {
  id: number
  createdAt: string
  content: string
  authorId: Nullable<number>
  authorName: Nullable<string>
  authorProfileImageUrl?: string
}

const PostCommentList = ({ snsPostId }: { snsPostId: number }) => {
  const query = createUrlQuery({
    'populate[0]': 'author',
    'populate[1]': 'author.profileImage',
    'filters[post][id][$eq]': `${snsPostId}`,
    sort: 'createdAt:desc',
  })

  const { snsComments: snsCommentsFromStrapi } = useSnsComments(query)

  const comments = snsCommentsFromStrapi
    ? sanitizePostCommentsForSnsPost(snsCommentsFromStrapi)
    : []

  if (comments.length === 0) {
    return (
      <StyledNotExistComment>
        <CommentIcon fontSize="large" css={mgBottom(4)} />
        <p>댓글이 없습니다. 첫 댓글을 입력해 보세요!</p>
      </StyledNotExistComment>
    )
  }

  return (
    <ul>
      {comments.map(comment => (
        <StyledPostCommentItem
          key={comment.id}
          comment={comment}
          postId={snsPostId}
        />
      ))}
    </ul>
  )
}

export default PostCommentList
