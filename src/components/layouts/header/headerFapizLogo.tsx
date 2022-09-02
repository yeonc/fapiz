import Link from '@mui/material/Link'
import styled from '@emotion/styled'
import ROUTE_URL from 'constants/routeUrl'
import FapizLogo from 'components/common/logos/fapizLogo'

const StyledFapizLogoWrapper = styled.div`
  display: flex;
  width: 120px;
`

const HeaderFapizLogo = () => (
  <Link href={ROUTE_URL.HOME}>
    <StyledFapizLogoWrapper>
      <FapizLogo />
    </StyledFapizLogoWrapper>
  </Link>
)

export default HeaderFapizLogo
