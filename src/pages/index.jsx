import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import ProTip from '../ProTip'
import Copyright from '../Copyright'
import Header from '../components/layouts/header/header'

export default function Index() {
  return (
    <>
      <Header />
      <Typography variant="h4" component="h1" gutterBottom>
        Home
      </Typography>
      <ProTip />
      <Copyright />
    </>
  )
}
