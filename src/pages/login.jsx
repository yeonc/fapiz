import React from 'react'
import Link from '@mui/material/Link'
import Header from '../components/layouts/header/header'
import { BACKEND_URL } from '../constants/constants'

const LoginPage = () => {
  return (
    <>
      <Header />
      <Link href={`${BACKEND_URL}/api/connect/google`}>
        구글 아이디로 로그인
      </Link>
    </>
  )
}

export default LoginPage
