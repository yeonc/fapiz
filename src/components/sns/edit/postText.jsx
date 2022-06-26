import TextField from '@mui/material/TextField'

const PostText = ({ postText, onPostTextChange }) => {
  return (
    <TextField
      label="글 내용을 작성해 주세요"
      multiline
      value={postText}
      onChange={e => onPostTextChange(e.target.value)}
    />
  )
}

export default PostText
