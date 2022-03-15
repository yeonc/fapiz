import { useState } from 'react'
import styled from '@emotion/styled'
import Navbar from './navbar'
import HeaderLogo from './headerLogo'

const StyledHeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  font-size: 20px;
`

const Header = () => {
  const [isLogined, setIsLogined] = useState(false)
  return (
    <StyledHeaderWrapper>
      <HeaderLogo />
      <Navbar isLogined={isLogined} />
    </StyledHeaderWrapper>
  )
}

export default Header
