import { useState } from 'react'
import { useSWRConfig } from 'swr'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CommentEditInput from 'components/sns/comment/commentEditInput'
import Comment from 'components/common/texts/comment'
import useMe from 'hooks/useMe'
import deleteComment from 'services/users/deleteComment'
import createUrlQuery from 'utils/createUrlQuery'

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

  const { me, isLoading } = useMe()
  const [isCommentEditMode, setIsCommentEditMode] = useState(false)

  if (isLoading) {
    return <p>로그인 유저 정보를 불러오는 중입니다..</p>
  }

  const isShowCommentEditButtonGroup = me.id === authorId ? true : false

  const handleCommentEditButtonClick = () => {
    setIsCommentEditMode(true)
  }

  const handleCommentEditCancelButtonClick = () => {
    setIsCommentEditMode(false)
  }

  const handleCommentDeleteButtonClick = async () => {
    const isCommentDelete = window.confirm('댓글을 삭제하시겠습니까?')
    if (!isCommentDelete) return

    try {
      await deleteComment(commentId)
      afterPostCommentDeleted()
    } catch (error) {
      console.error(error)
    }
  }

  const afterPostCommentEdited = () => {
    setIsCommentEditMode(false)
    refetch()
  }

  const afterPostCommentDeleted = () => {
    refetch()
  }

  const commentEditButtons = (
    <>
      <IconButton aria-label="댓글 수정" onClick={handleCommentEditButtonClick}>
        <EditIcon />
      </IconButton>
      <IconButton
        aria-label="댓글 삭제"
        onClick={handleCommentDeleteButtonClick}
      >
        <DeleteIcon />
      </IconButton>
    </>
  )

  return (
    <>
      {isCommentEditMode ? (
        <CommentEditInput
          commentId={commentId}
          initialCommentText={commentText}
          onCommentEditCancelButtonClick={handleCommentEditCancelButtonClick}
          afterPostCommentEdited={afterPostCommentEdited}
        />
      ) : (
        <Comment
          text={commentText}
          buttons={isShowCommentEditButtonGroup && commentEditButtons}
        />
      )}
    </>
  )
}

export default CommentByMode
