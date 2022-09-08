import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Typo from 'components/common/typo'
import LoginCard from 'components/login/loginCard'
import { DEFAULT_BLACK, DEFAULT_WHITE } from 'styles/constants/color'

const ENGLISH_ONLY_FONT_FAMILY = '"Montserrat", sans-serif'
const LOGIN_PAGE_TEXT_SHADOW = `${DEFAULT_BLACK} 3px 5px 2px`

const StyledLoginPageWrapper = styled.div`
  padding: 30px;
  background-image: url('/login-background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`

const StyledBackgroundTextWrapper = styled.div`
  color: ${DEFAULT_WHITE};
  text-shadow: ${LOGIN_PAGE_TEXT_SHADOW};
`

const fontFamily = css`
  font-family: ${ENGLISH_ONLY_FONT_FAMILY};
`

const bottomRightPosition = css`
  position: fixed;
  bottom: 30px;
  right: 30px;
  text-align: right;
`

const LoginPage = () => (
  <StyledLoginPageWrapper>
    <StyledBackgroundTextWrapper>
      <Typo variant="h1" component="p" css={fontFamily}>
        Welcome !
      </Typo>
      <Typo variant="h2" component="p" css={[fontFamily, bottomRightPosition]}>
        Fapiz is <br />
        Fashion Share SNS & Online Closet
      </Typo>
    </StyledBackgroundTextWrapper>
    <LoginCard />
  </StyledLoginPageWrapper>
)

export default LoginPage
