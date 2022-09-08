import { ChangeEvent } from 'react'
import styled from '@emotion/styled'
import Input from '@mui/material/Input'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { mgRight } from 'styles/layout'

const StyledCommentInputWrapper = styled.div`
  display: flex;
`

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
  <StyledCommentInputWrapper>
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      fullWidth={true}
      multiline={true}
      css={mgRight(6)}
    />
    {buttons}
  </StyledCommentInputWrapper>
)

export default CommentInput
