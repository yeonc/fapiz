import styled from '@emotion/styled'
import FapizLogo from 'components/common/logos/fapizLogo'

const StyledFapizLogoWrapper = styled.div`
  margin: 0 auto 6px;
  width: 150px;
`

const LoginFapizLogo = () => (
  <StyledFapizLogoWrapper>
    <FapizLogo />
  </StyledFapizLogoWrapper>
)

export default LoginFapizLogo
