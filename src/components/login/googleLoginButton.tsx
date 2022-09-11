import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import { BACKEND_URL } from 'constants/constants'
import GoogleLogo from 'components/login/googleLogo'
import { DEFAULT_WHITE } from 'styles/constants/color'

const StyledButton = styled(Button)`
  width: 80%;
  padding: 10px 18px;
  background-color: ${DEFAULT_WHITE};
`

const StyledGoogleLogoWrapper = styled.div`
  display: flex;
  margin-right: 6px;
`

const GoogleLoginButton = () => (
  <StyledButton
    href={`${BACKEND_URL}/api/connect/google`}
    startIcon={
      <StyledGoogleLogoWrapper>
        <GoogleLogo />
      </StyledGoogleLogoWrapper>
    }
    size="large"
    disableRipple
  >
    구글 아이디로 로그인하기
  </StyledButton>
)

export default GoogleLoginButton
