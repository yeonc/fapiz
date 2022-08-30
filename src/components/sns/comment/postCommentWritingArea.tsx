import { FormEvent, useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import useMe from 'hooks/useMe'
import createComment from 'services/snsComment/createComment'

const StyledPostCommentWritingAreaWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`

const avatarStyle = css`
  width: 30px;
  height: 30px;
  margin-right: 12px;
`

const StyledPostCommentForm = styled.form`
  display: flex;
  align-items: flex-end;
  flex-grow: 1;
`

const StyledTextField = styled(TextField)`
  margin-right: 6px;
`

type PostCommentWritingAreaProps = {
  snsPostId: number
  afterPostCommentSubmit: () => void
  className?: string
}

const PostCommentWritingArea = ({
  snsPostId,
  afterPostCommentSubmit,
  className,
}: PostCommentWritingAreaProps) => {
  const [comment, setComment] = useState('')

  const { me, isLoading } = useMe()

  if (isLoading) {
    return <p>로딩중</p>
  }

  const handleCommentChange = (comment: string) => {
    setComment(comment)
  }

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
    <StyledPostCommentWritingAreaWrapper className={className}>
      <Avatar alt={me.username} src={me.profileImage?.url} css={avatarStyle} />
      <StyledPostCommentForm onSubmit={handleCommentSubmit}>
        <StyledTextField
          label="댓글을 입력하세요"
          variant="standard"
          value={comment}
          onChange={e => handleCommentChange(e.target.value)}
          required
          fullWidth={true}
        />
        <Button variant="contained" size="small" type="submit">
          등록
        </Button>
      </StyledPostCommentForm>
    </StyledPostCommentWritingAreaWrapper>
  )
}

export default PostCommentWritingArea
