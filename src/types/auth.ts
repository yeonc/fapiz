import { Nullable } from 'types/common'
import { User } from './user'

export type AccessToken = Nullable<string>

export type LoginSuccessResponseData = {
  jwt: string
  user: User
}
