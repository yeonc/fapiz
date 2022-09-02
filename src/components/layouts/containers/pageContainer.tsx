import styled from '@emotion/styled'

const StyledContainer = styled.div`
  padding-top: 100px;
  max-width: 800px;
  margin: 0 auto;
`

const PageContainer = ({ children }) => (
  <StyledContainer>{children}</StyledContainer>
)

export default PageContainer
