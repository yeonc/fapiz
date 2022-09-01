import { IS_SERVER } from 'constants/constants'

type JwtToken = string

const getToken = (): JwtToken | null => {
  const token = !IS_SERVER ? localStorage.getItem('jwt') : null
  return token
}

export default getToken
