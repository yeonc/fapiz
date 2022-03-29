import { useEffect, useState } from 'react'
import Header from './header'

const withHeader = Page => {
  return () => {
    // 임시 코드 (상태 관리 라이브러리 도입 후 지울 것)
    const [isLoggedIn, setIsLoggedIn] = useState()

    useEffect(() => {
      const loginState = !!localStorage.getItem('jwt')
      setIsLoggedIn(loginState)
    }, [])

    return (
      <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Page isLoggedIn={isLoggedIn} />
      </>
    )
  }
}

export default withHeader
