import { FunctionComponent } from 'react'
import LoginPageRedirect from 'components/common/redirect/loginPageRedirect'
import useMe from 'hooks/useMe'

const withLoginPageRedirect = (Page: FunctionComponent) => {
  return () => {
    const { me, isLoading } = useMe()

    if (isLoading) {
      return <p>로딩중...</p>
    }

    if (!me) {
      return <LoginPageRedirect />
    }

    return <Page />
  }
}

export default withLoginPageRedirect
