import { ChangeEvent, useState } from 'react'
import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import EditOffIcon from '@mui/icons-material/EditOff'
import SendIcon from '@mui/icons-material/Send'
import CommentInput from 'components/common/inputs/commentInput'
import editComment from 'services/snsComment/editComment'
import { Id } from 'types/common'

const StyledCommentEditButtonsWrapper = styled.div`
  display: flex;
  align-self: flex-end;
`

type CommentEditInputProps = {
  commentId: Id
  initialCommentText: string
  onCommentEditCancelButtonClick: () => void
  afterPostCommentEdited: () => void
}

const CommentEditInput = ({
  commentId,
  initialCommentText,
  onCommentEditCancelButtonClick,
  afterPostCommentEdited,
}: CommentEditInputProps) => {
  const [commentText, setCommentText] = useState(initialCommentText)

  const handleCommentTextChange = (commentText: string) => {
    setCommentText(commentText)
  }

  const handleCommentSubmitButtonClick = async () => {
    try {
      await editComment({ commentId, commentText })
      afterPostCommentEdited()
    } catch (error) {
      console.error(error)
    }
  }

  const commentEditButtons = (
    <StyledCommentEditButtonsWrapper>
      <IconButton
        aria-label="댓글 수정 취소"
        onClick={onCommentEditCancelButtonClick}
        size="small"
      >
        <EditOffIcon fontSize="small" />
      </IconButton>
      <IconButton
        aria-label="수정한 댓글 전송"
        onClick={handleCommentSubmitButtonClick}
        size="small"
      >
        <SendIcon fontSize="small" />
      </IconButton>
    </StyledCommentEditButtonsWrapper>
  )

  return (
    <CommentInput
      placeholder="수정할 댓글 내용을 입력하세요"
      value={commentText}
      onChange={e => handleCommentTextChange(e.target.value)}
      buttons={commentEditButtons}
    />
  )
}

export default CommentEditInput
