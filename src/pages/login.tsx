import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Typo from 'components/common/typo'
import LoginCard from 'components/login/loginCard'
import { DEFAULT_BLACK } from 'styles/constants/color'

const StyledLoginPageWrapper = styled.div`
  padding: 30px;
  background-image: url('/login-background.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background: linear-gradient(to left, #ec2f4b, #009fff);
`

const StyledBackgroundTextWrapper = styled.div`
  color: ${DEFAULT_BLACK};
`

const csss = css`
  position: fixed;
  bottom: 30px;
  right: 30px;
  text-align: right;
`

const LoginPage = () => (
  <StyledLoginPageWrapper>
    <StyledBackgroundTextWrapper>
      <Typo variant="h1" component="p">
        Welcome !
      </Typo>
      <Typo variant="h2" component="p" css={csss}>
        Fapiz is <br />
        Fashion Share SNS & Online Closet
      </Typo>
    </StyledBackgroundTextWrapper>
    <LoginCard />
  </StyledLoginPageWrapper>
)

export default LoginPage
