import styled from '@emotion/styled'
import { ReactNode } from 'react'

const StyledCommentText = styled.p`
  display: inline;
  margin-right: 4px;
  white-space: pre-line;
`

type CommentProps = {
  text: string
  buttons: ReactNode | null
}

const Comment = ({ text, buttons }: CommentProps) => (
  <div>
    <StyledCommentText>{text}</StyledCommentText>
    {buttons}
  </div>
)

export default Comment
