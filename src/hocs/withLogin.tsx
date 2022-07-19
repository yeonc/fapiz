import { FunctionComponent } from 'react'
import useMe from 'hooks/useMe'

const withLogin = <T,>(Component: FunctionComponent<T>) => {
  return ({ ...props }: T) => {
    const { me } = useMe()
    const isLoggedIn = !!me

    if (!isLoggedIn) {
      return null
    }

    return <Component {...props} />
  }
}

export default withLogin
