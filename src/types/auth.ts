import { Nullable } from 'types/common'
import { User } from './user'

export type AccessToken = Nullable<string>

export type LoginSuccessResponseFromStrapi = {
  jwt: string
  user: User
}

export type LogoutResponse = {
  message: string
}

export type AuthResponse = SuccessAuthResponse | FailAuthResponse

type SuccessAuthResponse = {
  result: 'success'
  message: string
  user: User
}

type FailAuthResponse = {
  result: 'fail'
  message: string
}
