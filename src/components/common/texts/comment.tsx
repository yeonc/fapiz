import styled from '@emotion/styled'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'

const StyledCommentText = styled.p`
  display: inline;
  margin-right: 4px;
`

type CommentProps = {
  text: string
  buttons?: EmotionJSX.Element | null
}

const Comment = ({ text, buttons }: CommentProps) => (
  <div>
    <StyledCommentText>{text}</StyledCommentText>
    {buttons}
  </div>
)

export default Comment
