import styled from '@emotion/styled'
import Navbar from './navbar'
import HeaderLogo from './headerLogo'

const StyledHeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  font-size: 20px;
`

const Header = ({ isLoggedIn, userId }) => {
  return (
    <StyledHeaderWrapper>
      <HeaderLogo />
      <Navbar isLoggedIn={isLoggedIn} userId={userId} />
    </StyledHeaderWrapper>
  )
}

export default Header
