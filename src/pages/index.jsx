import React from 'react'
import Typo from 'components/common/typo'
import withHeader from 'hocs/withHeader'
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
