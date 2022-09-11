import styled from '@emotion/styled'

const StyledContainer = styled.div`
  padding-top: 84px;
`

const PaddingTopContainer = ({ children }) => (
  <StyledContainer>{children}</StyledContainer>
)

export default PaddingTopContainer
