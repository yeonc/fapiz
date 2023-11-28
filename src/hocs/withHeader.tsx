import { FunctionComponent } from 'react'
import PaddingTopContainer from 'components/layouts/containers/paddingTopContainer'
import Header from 'components/layouts/header'

const withHeader = (Page: FunctionComponent) => {
  const ComponentWithHeader = () => {
    return (
      <PaddingTopContainer>
        <Header />
        <Page />
      </PaddingTopContainer>
    )
  }
  return ComponentWithHeader
}

export default withHeader
