import Typo from 'components/common/typo'
import { mgBottom } from 'styles/layout'

const SearchResultHeadingTypo = ({ children }) => {
  return (
    <Typo variant="h5" component="h2" css={mgBottom(10)}>
      {children}
    </Typo>
  )
}

export default SearchResultHeadingTypo
