import { FunctionComponent } from 'react'
import PaddingTopContainer from 'components/layouts/containers/paddingTopContainer'
import Header from 'components/layouts/header'

const withHeader = <P extends {}>(Page: FunctionComponent<P>) => {
  const ComponentWithHeader = (props: P) => {
    return (
      <PaddingTopContainer>
        <Header />
        <Page {...props} />
      </PaddingTopContainer>
    )
  }
  return ComponentWithHeader
}

export default withHeader
