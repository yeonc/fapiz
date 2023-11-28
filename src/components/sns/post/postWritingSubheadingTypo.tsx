import Typo from 'components/common/typo'
import { mgBottom } from 'styles/layout'

const PostWritingSubheadingTypo = ({ children }: { children: string }) => (
  <Typo variant="subtitle1" component="h2" css={mgBottom(10)}>
    {children}
  </Typo>
)

export default PostWritingSubheadingTypo
