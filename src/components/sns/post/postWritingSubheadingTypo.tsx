import Typo from 'components/common/typo'
import { mgBottom } from 'styles/layout'

type PostWritingSubheadingTypoProps = {
  children: string
}

const PostWritingSubheadingTypo = ({
  children,
}: PostWritingSubheadingTypoProps) => (
  <Typo variant="subtitle1" component="h2" css={mgBottom(10)}>
    {children}
  </Typo>
)

export default PostWritingSubheadingTypo
