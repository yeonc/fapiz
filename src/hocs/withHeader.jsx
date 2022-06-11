import Header from 'components/layouts/header'

const withHeader = Page => {
  return () => {
    return (
      <>
        <Header />
        <Page />
      </>
    )
  }
}

export default withHeader
