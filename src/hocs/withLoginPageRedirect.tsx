import { FunctionComponent } from 'react'
import LoginPageRedirect from 'components/common/redirect/loginPageRedirect'
import useMe from 'hooks/useMe'
import { User } from 'types/user'

const withLoginPageRedirect = (Page: FunctionComponent) => {
  return () => {
    const { me, isLoading } = useMe<User>()

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
