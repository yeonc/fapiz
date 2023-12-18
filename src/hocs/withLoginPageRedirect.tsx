import { FunctionComponent } from 'react'
import LoginPageRedirect from 'components/common/redirect/loginPageRedirect'
import { useAuth } from 'context/AuthContext'

const withLoginPageRedirect = (Page: FunctionComponent) => {
  const ComponentWithLoginPageRedirect = () => {
    const { me, isLoading } = useAuth()

    if (isLoading) {
      return null
    }

    if (!me) {
      return <LoginPageRedirect />
    }

    return <Page />
  }
  return ComponentWithLoginPageRedirect
}

export default withLoginPageRedirect
