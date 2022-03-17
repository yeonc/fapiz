import React from 'react'
import Link from '@mui/material/Link'
import Header from '../components/layouts/header/header'

const backendUrl = process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL

const Login = () => {
  return (
    <>
      <Header />
      <h1>login page</h1>
      <Link href={`${backendUrl}/api/connect/google`}>
        구글 아이디로 로그인
      </Link>
    </>
  )
}

export default Login
