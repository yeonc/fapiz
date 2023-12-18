import { ReactNode } from 'react'
import styled from '@emotion/styled'

const StyledContainer = styled.div`
  padding-top: 84px;
`

const PaddingTopContainer = ({ children }: { children: ReactNode }) => (
  <StyledContainer>{children}</StyledContainer>
)

export default PaddingTopContainer
