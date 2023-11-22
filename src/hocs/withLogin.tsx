import { FunctionComponent } from 'react'
import useMe from 'hooks/useMe'
import { User } from 'types/user'

const withLogin = <T,>(Component: FunctionComponent<T>) => {
  return ({ ...props }: T) => {
    const { me } = useMe<User>()
    const isLoggedIn = !!me

    if (!isLoggedIn) {
      return null
    }

    return <Component {...props} />
  }
}

export default withLogin
