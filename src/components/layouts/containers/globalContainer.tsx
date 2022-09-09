import { css } from '@emotion/react'
import styled from '@emotion/styled'
import WarningIcon from '@mui/icons-material/Warning'
import Typo from 'components/common/typo'
import { DEFAULT_BLACK, LIGHT_GRAY } from 'styles/constants/color'

const StyledWarningMessageWrapper = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  height: 100vh;
  background-color: ${LIGHT_GRAY};
  background: linear-gradient(to right, #a8a8a8, #d7dde8);
`

const warningIconStyle = css`
  margin-bottom: 10px;
  font-size: 80px;
  color: ${DEFAULT_BLACK};
`

const StyledContainer = styled.div`
  @media screen and (max-width: 800px) {
    .Children {
      display: none;
    }

    .WarningMessageWrapper {
      display: flex;
    }
  }
`
const GlobalContainer = ({ children }) => {
  return (
    <StyledContainer>
      <div className="Children">{children}</div>
      <StyledWarningMessageWrapper className="WarningMessageWrapper">
        <WarningIcon css={warningIconStyle} />
        <Typo variant="h6" component="p">
          Fapiz는 데스크톱 환경에 최적화된 웹페이지입니다!
          <br />
          가로 800px 이상에서 즐겨 주시면 감사하겠습니다~!
        </Typo>
      </StyledWarningMessageWrapper>
    </StyledContainer>
  )
}

export default GlobalContainer
