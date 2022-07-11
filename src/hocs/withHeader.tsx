import Header from 'components/layouts/header'

const withHeader = (Page: any) => {
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
