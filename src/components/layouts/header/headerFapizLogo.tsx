import Link from '@mui/material/Link'
import styled from '@emotion/styled'
import ROUTE_URL from 'constants/routeUrl'
import FapizLogo from 'components/common/logos/fapizLogo'

const StyledFapizLogoWrapper = styled.div`
  margin-right: 28px;
`

const HeaderFapizLogo = () => (
  <Link href={ROUTE_URL.HOME}>
    <StyledFapizLogoWrapper>
      <FapizLogo />
    </StyledFapizLogoWrapper>
  </Link>
)

export default HeaderFapizLogo
