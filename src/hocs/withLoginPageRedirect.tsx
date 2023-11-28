import { FunctionComponent } from 'react'
import LoginPageRedirect from 'components/common/redirect/loginPageRedirect'
import useMe from 'hooks/useMe'
import { User } from 'types/user'

const withLoginPageRedirect = (Page: FunctionComponent) => {
  const ComponentWithLoginPageRedirect = () => {
    const { me, isLoading } = useMe<User>()

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
