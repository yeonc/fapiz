import styled from '@emotion/styled'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import UserAvatar from 'components/common/images/userAvatar'
import { horizontal } from 'styles/layout'

const CommentInputFormWrapper = styled.form`
  display: flex;
  align-items: center;
`

const comments = [
  {
    id: 1,
    author: 'author 1',
    text: 'abcabcabcabcabcabcabcabcabc',
  },
  {
    id: 2,
    author: 'author 2',
    text: 'defdefdefdefdefdefdefdefdefdefdefdefdefdef',
  },
  {
    id: 3,
    author: 'author 3',
    text: 'ghighighighighighighighighighighighighighighighighighighighighighighighighighighighighighighighighighighighighi',
  },
]

const PostCommentInputForm = () => (
  <CommentInputFormWrapper>
    <UserAvatar
      profileImageUrl="/"
      username="john"
      styleConfig={{ width: 30, height: 30, marginRight: 1 }}
    />
    <TextField label="댓글을 입력하세요" variant="standard" />
    <Button variant="contained" size="small">
      등록
    </Button>
  </CommentInputFormWrapper>
)

const PostCommentList = () => (
  <ul>
    {comments.map(comment => (
      <li key={comment.id} css={horizontal}>
        <span>{comment.author}</span>
        <p>{comment.text}</p>
        <IconButton aria-label="댓글 수정">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="댓글 삭제">
          <DeleteIcon />
        </IconButton>
      </li>
    ))}
  </ul>
)

const PostCommentContents = () => (
  <>
    <PostCommentInputForm />
    <PostCommentList />
  </>
)

export default PostCommentContents
