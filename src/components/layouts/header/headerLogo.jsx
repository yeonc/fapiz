import Link from '@mui/material/Link'
import styled from '@emotion/styled'
import ROUTE_URL from 'constants/routeUrl'
import FapizLogo from 'components/layouts/header/fapizLogo'

const StyledFapizLogoWrapper = styled.div`
  margin-right: 28px;
`

const HeaderLogo = () => (
  <Link href={ROUTE_URL.HOME}>
    <StyledFapizLogoWrapper>
      <FapizLogo />
    </StyledFapizLogoWrapper>
  </Link>
)

export default HeaderLogo
