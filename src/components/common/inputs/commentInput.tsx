import { ChangeEvent } from 'react'
import Input from '@mui/material/Input'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { mgRight } from 'styles/layout'

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
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      fullWidth={true}
      multiline={true}
      css={mgRight(6)}
    />
    {buttons}
  </>
)

export default CommentInput
