import React from 'react'
import Typo from 'components/common/Typo'
import withHeader from 'components/layouts/Header'
import ProTip from 'ProTip'
import Copyright from 'Copyright'

const IndexPage = () => (
  <>
    <Typo>Home</Typo>
    <ProTip />
    <Copyright />
  </>
)

export default withHeader(IndexPage)
