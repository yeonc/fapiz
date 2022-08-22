import styled from '@emotion/styled'
import Navbar from 'components/layouts/header/navbar'
import HeaderLogo from 'components/layouts/header/headerLogo'

const StyledHeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
`

const Header = () => {
  return (
    <StyledHeaderWrapper>
      <HeaderLogo />
      <Navbar />
    </StyledHeaderWrapper>
  )
}

export default Header
