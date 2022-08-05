import { FormEvent, useState } from 'react'
import styled from '@emotion/styled'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import { horizontal } from 'styles/layout'
import useMe from 'hooks/useMe'
import createComment from 'services/comment/createComment'
import addBackendUrlToImageUrl from 'utils/addBackendUrlToImageUrl'

const StyledPostCommentWritingAreaWrapper = styled.div`
  display: flex;
  align-items: center;
`

type PostCommentWritingAreaProps = {
  snsPostId: number
  afterPostCommentSubmit: () => void
}

const PostCommentWritingArea = ({
  snsPostId,
  afterPostCommentSubmit,
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
    <StyledPostCommentWritingAreaWrapper>
      <Avatar
        alt={me.username}
        src={addBackendUrlToImageUrl(me.profileImage?.url)}
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
