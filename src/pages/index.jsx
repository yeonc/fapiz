import React from 'react'
import Typo from 'components/common/Typo'
import Header from 'components/layouts/header/header'
import ProTip from 'ProTip'
import Copyright from 'Copyright'

export default function IndexPage() {
  return (
    <>
      <Header />
      <Typo>Home</Typo>
      <ProTip />
      <Copyright />
    </>
  )
}
