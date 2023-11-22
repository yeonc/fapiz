import { Nullable } from 'types/common'
import { User } from './user'

export type AccessToken = Nullable<string>

export type LoginSuccessResponse = {
  jwt: string
  user: User
}
