import PaddingTopContainer from 'components/layouts/containers/paddingTopContainer'
import Header from 'components/layouts/header'

const withHeader = (Page: any) => {
  return () => {
    return (
      <PaddingTopContainer>
        <Header />
        <Page />
      </PaddingTopContainer>
    )
  }
}

export default withHeader
