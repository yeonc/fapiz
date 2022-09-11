import styled from '@emotion/styled'
import Navbar from 'components/layouts/header/navbar'
import HeaderFapizLogo from 'components/layouts/header/headerFapizLogo'
import { DEFAULT_WHITE } from 'styles/constants/color'

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  padding: 20px;
  width: 100%;
  align-items: center;
  font-size: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-color: ${DEFAULT_WHITE};
`

const Header = () => {
  return (
    <StyledHeader>
      <HeaderFapizLogo />
      <Navbar />
    </StyledHeader>
  )
}

export default Header
