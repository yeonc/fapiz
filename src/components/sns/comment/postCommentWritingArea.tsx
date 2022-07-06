import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import styled from '@emotion/styled'
import { horizontal } from 'styles/layout'
import createComment from 'services/users/createComment'
import useMe from 'hooks/useMe'
import { BACKEND_URL } from 'constants/constants'

const StyledPostCommentWritingAreaWrapper = styled.div`
  display: flex;
  align-items: center;
`

const PostCommentWritingArea = ({ snsPostId, afterPostCommentSubmit }) => {
  const [comment, setComment] = useState('')

  const { me, isLoading } = useMe()

  if (isLoading) {
    return <p>로딩중</p>
  }

  const handleCommentChange = (comment: any) => {
    setComment(comment)
  }

  const handleCommentSubmit = async (e: any) => {
    e.preventDefault()
    try {
      await createComment({ comment, postId: snsPostId, authorId: me.id })
      setComment('')
      afterPostCommentSubmit()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <StyledPostCommentWritingAreaWrapper>
      <Avatar
        alt={me.username}
        src={BACKEND_URL + me.profileImage.url}
        sx={{ width: 30, height: 30, marginRight: 1 }}
      />
      <form onSubmit={handleCommentSubmit} css={horizontal}>
        <TextField
          label="댓글을 입력하세요"
          variant="standard"
          value={comment}
          onChange={e => handleCommentChange(e.target.value)}
          required
        />
        <Button variant="contained" size="small" type="submit">
          등록
        </Button>
      </form>
    </StyledPostCommentWritingAreaWrapper>
  )
}

export default PostCommentWritingArea
