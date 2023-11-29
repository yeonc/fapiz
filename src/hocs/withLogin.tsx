import { FunctionComponent } from 'react'
import useMe from 'hooks/useMe'
import { User } from 'types/user'

const withLogin = <P extends {}>(Component: FunctionComponent<P>) => {
  const ComponentWithLogin = (props: P) => {
    const { me } = useMe<User>()
    const isLoggedIn = !!me

    if (!isLoggedIn) {
      return null
    }

    return <Component {...props} />
  }
  return ComponentWithLogin
}

export default withLogin
