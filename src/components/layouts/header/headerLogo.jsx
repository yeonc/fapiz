import Link from '@mui/material/Link'
import styled from '@emotion/styled'
import ROUTE_URL from '../../../constants/routeUrl'
import FapizLogo from './fapizLogo'

const FapizLogoWrapper = styled.div`
  margin-right: 28px;
`

const HeaderLogo = () => (
  <Link href={ROUTE_URL.HOME}>
    <FapizLogoWrapper>
      <FapizLogo />
    </FapizLogoWrapper>
  </Link>
)

export default HeaderLogo
