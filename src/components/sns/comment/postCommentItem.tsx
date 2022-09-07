import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import CommentByMode from 'components/sns/comment/commentByMode'
import ROUTE_URL from 'constants/routeUrl'

const StyledPostCommentWrapper = styled.li`
  display: flex;
`

const StyledCommentAuthorWrapper = styled.div`
  display: flex;
  width: 120px;
  margin-right: 8px;
`

const authorAvatarStyle = css`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`

type PostCommentItemProps = {
  comment: any // TODO: 타입 정의
  postId: number
  className?: string
}

const PostCommentItem = ({
  comment,
  postId,
  className,
}: PostCommentItemProps) => (
  <StyledPostCommentWrapper className={className}>
    <Link href={`${ROUTE_URL.SNS}/${comment.authorId}`}>
      <StyledCommentAuthorWrapper>
        <Avatar
          alt={comment.authorName}
          src={comment.authorProfileImageUrl}
          css={authorAvatarStyle}
        />
        <span>{comment.authorName}</span>
      </StyledCommentAuthorWrapper>
    </Link>
    <CommentByMode
      commentId={comment.id}
      commentText={comment.content}
      snsPostId={postId}
      commentAuthorId={comment.authorId}
    />
  </StyledPostCommentWrapper>
)

export default PostCommentItem
