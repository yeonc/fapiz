import styled from '@emotion/styled'
import Navbar from 'components/layouts/header/navbar'
import HeaderFapizLogo from 'components/layouts/header/headerFapizLogo'

const StyledHeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
`

const Header = () => {
  return (
    <StyledHeaderWrapper>
      <HeaderFapizLogo />
      <Navbar />
    </StyledHeaderWrapper>
  )
}

export default Header
