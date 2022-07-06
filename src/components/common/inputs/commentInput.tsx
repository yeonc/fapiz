import Input from '@mui/material/Input'

const CommentInput = ({ placeholder, value, onChange, buttons }) => (
  <>
    <Input placeholder={placeholder} value={value} onChange={onChange} />
    {buttons}
  </>
)

export default CommentInput
