import styled from '@emotion/styled'
import Typo from 'components/common/typo'
import GoogleLoginButton from 'components/login/googleLoginButton'
import LoginFapizLogo from 'components/login/loginFapizLogo'
import { mgBottom } from 'styles/layout'

const StyledLoginCardWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 60px;
  min-width: 500px;
  height: 300px;
  border-radius: 10px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`

const LoginCard = () => (
  <StyledLoginCardWrapper>
    <LoginFapizLogo />
    <Typo variant="h6" component="h1" css={mgBottom(30)}>
      로그인
    </Typo>
    <GoogleLoginButton />
  </StyledLoginCardWrapper>
)

export default LoginCard
