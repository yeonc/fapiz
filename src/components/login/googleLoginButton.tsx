import styled from '@emotion/styled'
import LoadingButton from '@mui/lab/LoadingButton'
import { BACKEND_URL } from 'constants/common'
import GoogleLogo from 'components/login/googleLogo'
import { DEFAULT_WHITE } from 'styles/constants/color'
import { useState } from 'react'

const StyledLoadingButton = styled(LoadingButton)`
  width: 80%;
  padding: 10px 18px;
  background-color: ${DEFAULT_WHITE};
`

const StyledGoogleLogoWrapper = styled.div`
  display: flex;
  margin-right: 6px;
`

const GoogleLoginButton = () => {
  const [isLoginPageLoading, setIsLoginPageLoading] = useState(false)
  const handleClick = () => setIsLoginPageLoading(true)

  return (
    <StyledLoadingButton
      href={`${BACKEND_URL}/api/connect/google`}
      onClick={handleClick}
      startIcon={
        <StyledGoogleLogoWrapper>
          <GoogleLogo />
        </StyledGoogleLogoWrapper>
      }
      size="large"
      disableRipple
      loading={isLoginPageLoading}
      loadingPosition="center"
    >
      구글 아이디로 로그인하기
    </StyledLoadingButton>
  )
}

export default GoogleLoginButton
