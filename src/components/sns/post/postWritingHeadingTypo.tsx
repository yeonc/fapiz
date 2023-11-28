import Typo from 'components/common/typo'
import { mgBottom } from 'styles/layout'

const PostWritingHeadingTypo = ({ children }: { children: string }) => (
  <Typo variant="h5" component="h1" css={mgBottom(20)}>
    {children}
  </Typo>
)

export default PostWritingHeadingTypo
