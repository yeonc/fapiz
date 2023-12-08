import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import Typo from 'components/common/typo'
import CommentByMode from 'components/sns/comment/commentByMode'
import ROUTE_URL from 'constants/routeUrl'
import { DEFAULT_GRAY } from 'styles/constants/color'
import getFormattedDate from 'utils/getFormattedDate'
import { PostCommentForSnsPost } from './postCommentList'
import { Id } from 'types/common'

const WITHDRAWN_USER_TEXT = '탈퇴한 유저'

const StyledPostCommentWrapper = styled.li`
  display: flex;
`

const StyledCommentAuthorWrapper = styled.div`
  display: flex;
  width: 120px;
  margin-right: 8px;
`

const StyledCommentContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const authorAvatarStyle = css`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`

const commentCreatedAtTextStyle = css`
  color: ${DEFAULT_GRAY};
`

type PostCommentItemProps = {
  comment: PostCommentForSnsPost
  postId: Id
  className?: string
}

const PostCommentItem = ({
  comment,
  postId,
  className,
}: PostCommentItemProps) => {
  const commentCreatedAtText = getFormattedDate(new Date(comment.createdAt))

  return (
    <StyledPostCommentWrapper className={className}>
      <Link href={`${ROUTE_URL.SNS}/${comment.authorId}`}>
        <StyledCommentAuthorWrapper>
          <Avatar
            alt={comment.authorName || WITHDRAWN_USER_TEXT}
            src={comment.authorProfileImageUrl}
            css={authorAvatarStyle}
          />
          <span>{comment.authorName || WITHDRAWN_USER_TEXT}</span>
        </StyledCommentAuthorWrapper>
      </Link>
      <StyledCommentContentWrapper>
        <CommentByMode
          commentId={comment.id}
          commentText={comment.content}
          snsPostId={postId}
          commentAuthorId={comment.authorId}
        />
        <Typo
          variant="caption"
          component="span"
          css={commentCreatedAtTextStyle}
        >
          {commentCreatedAtText}
        </Typo>
      </StyledCommentContentWrapper>
    </StyledPostCommentWrapper>
  )
}

export default PostCommentItem
