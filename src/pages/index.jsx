import React from 'react'
import Typo from '../components/common/Typo'
import ProTip from '../ProTip'
import Copyright from '../Copyright'
import Header from '../components/layouts/header/header'

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
