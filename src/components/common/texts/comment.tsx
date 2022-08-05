import { EmotionJSX } from '@emotion/react/types/jsx-namespace'

type CommentProps = {
  text: string
  buttons?: EmotionJSX.Element | null
}

const Comment = ({ text, buttons }: CommentProps) => (
  <>
    <p>{text}</p>
    {buttons}
  </>
)

export default Comment
