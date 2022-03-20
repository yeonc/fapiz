import React from 'react'
import Header from './header'

const withHeader = Page => {
  return () => (
    <>
      <Header />
      <Page />
    </>
  )
}

export default withHeader
