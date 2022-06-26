import { useState } from 'react'
import { useSWRConfig } from 'swr'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import Input from '@mui/material/Input'
import deleteComment from 'services/users/deleteComment'
import editComment from 'services/users/editComment'
import useMe from 'hooks/useMe'
import createUrlQuery from 'utils/createUrlQuery'

const CommentInViewMode = ({
  commentId,
  commentText,
  onCommentEditButtonClick,
  afterPostCommentDelete,
  isShowCommentEditButtonGroup,
}) => {
  const handleCommentDeleteButtonClick = async commentId => {
    try {
      await deleteComment(commentId)
      afterPostCommentDelete()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <p>{commentText}</p>
      {isShowCommentEditButtonGroup ? (
        <>
          <IconButton aria-label="댓글 수정" onClick={onCommentEditButtonClick}>
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="댓글 삭제"
            onClick={() => handleCommentDeleteButtonClick(commentId)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ) : null}
    </>
  )
}

const CommentInEditMode = ({
  commentId,
  commentText,
  onCommentEditCancelButtonClick,
  afterPostCommentUpdate,
}) => {
  const [comment, setComment] = useState(commentText)

  const handleCommentTextChange = commentText => {
    setComment(commentText)
  }

  const handleCommentSubmitButtonClick = async (commentId, comment) => {
    try {
      await editComment({
        commentId,
        comment,
      })
      afterPostCommentUpdate()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Input
        placeholder="수정할 댓글 내용을 입력하세요"
        value={comment}
        onChange={e => handleCommentTextChange(e.target.value)}
      />
      <IconButton
        aria-label="댓글 수정 취소"
        onClick={onCommentEditCancelButtonClick}
      >
        <EditOffIcon />
      </IconButton>
      <IconButton
        aria-label="수정한 댓글 전송"
        onClick={() => handleCommentSubmitButtonClick(commentId, comment)}
      >
        <SendIcon />
      </IconButton>
    </>
  )
}

const CommentByMode = ({ commentId, commentText, snsPostId, authorId }) => {
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

  const { me, isMeLoading } = useMe()
  const [isCommentEditMode, setIsCommentEditMode] = useState(false)

  if (isMeLoading) {
    return <p>로그인 유저 정보를 불러오는 중입니다..</p>
  }

  const isShowCommentEditButtonGroup = me.id === authorId ? true : false

  const handleCommentEditButtonClick = () => {
    setIsCommentEditMode(true)
  }

  const handleCommentEditCancelButtonClick = () => {
    setIsCommentEditMode(false)
  }

  const afterPostCommentUpdate = () => {
    setIsCommentEditMode(false)
    refetch()
  }

  const afterPostCommentDelete = () => {
    refetch()
  }

  return (
    <>
      {isCommentEditMode ? (
        <CommentInEditMode
          onCommentEditCancelButtonClick={handleCommentEditCancelButtonClick}
          afterPostCommentUpdate={afterPostCommentUpdate}
          commentId={commentId}
          commentText={commentText}
        />
      ) : (
        <CommentInViewMode
          onCommentEditButtonClick={handleCommentEditButtonClick}
          afterPostCommentDelete={afterPostCommentDelete}
          commentId={commentId}
          commentText={commentText}
          isShowCommentEditButtonGroup={isShowCommentEditButtonGroup}
        />
      )}
    </>
  )
}

export default CommentByMode
