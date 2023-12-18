import { FunctionComponent } from 'react'
import { useAuth } from 'context/AuthContext'

const withLogin = <P extends {}>(Component: FunctionComponent<P>) => {
  const ComponentWithLogin = (props: P) => {
    const { me } = useAuth()

    const isLoggedIn = !!me

    if (!isLoggedIn) {
      return null
    }

    return <Component {...props} />
  }
  return ComponentWithLogin
}

export default withLogin
