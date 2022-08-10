import { ChangeEvent, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import EditOffIcon from '@mui/icons-material/EditOff'
import SendIcon from '@mui/icons-material/Send'
import CommentInput from 'components/common/inputs/commentInput'
import editComment from 'services/comment/editComment'

type CommentEditInputProps = {
  commentId: number
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
    <>
      <IconButton
        aria-label="댓글 수정 취소"
        onClick={onCommentEditCancelButtonClick}
      >
        <EditOffIcon />
      </IconButton>
      <IconButton
        aria-label="수정한 댓글 전송"
        onClick={handleCommentSubmitButtonClick}
      >
        <SendIcon />
      </IconButton>
    </>
  )

  return (
    <CommentInput
      placeholder="수정할 댓글 내용을 입력하세요"
      value={commentText}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleCommentTextChange(e.target.value)
      }
      buttons={commentEditButtons}
    />
  )
}

export default CommentEditInput
