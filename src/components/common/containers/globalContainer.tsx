import styled from '@emotion/styled'

const StyledContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const GlobalContainer = ({ children }) => (
  <StyledContainer>{children}</StyledContainer>
)

export default GlobalContainer
