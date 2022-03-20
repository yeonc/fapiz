import React from 'react'
import styled from '@emotion/styled'
import Navbar from './navbar'
import HeaderLogo from './headerLogo'

const StyledHeaderWrapper = styled.header`
  display: flex;
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
