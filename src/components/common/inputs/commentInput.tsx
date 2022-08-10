import { ChangeEvent } from 'react'
import Input from '@mui/material/Input'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'

type CommentInputProps = {
  placeholder?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  buttons?: EmotionJSX.Element | null
}

const CommentInput = ({
  placeholder,
  value,
  onChange,
  buttons,
}: CommentInputProps) => (
  <>
    <Input placeholder={placeholder} value={value} onChange={onChange} />
    {buttons}
  </>
)

export default CommentInput
