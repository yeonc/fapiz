import { FunctionComponent } from 'react'
import LoginPageRedirect from 'components/common/redirect/loginPageRedirect'
import useMe from 'hooks/useMe'

const withLoginPageRedirect = (Page: FunctionComponent) => {
  return () => {
    const { me, isLoading } = useMe()

    if (isLoading) {
      return null
    }

    if (!me) {
      return <LoginPageRedirect />
    }

    return <Page />
  }
}

export default withLoginPageRedirect
