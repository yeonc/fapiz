import { Nullable } from 'types/common'
import { FashionStyle } from 'types/fashion'

export type User = {
  id: number
  username: string
  gender: Nullable<string>
  height: Nullable<number>
  weight: Nullable<number>
  bodyShape: Nullable<string>
  fashionStyles: Nullable<FashionStyle[]>
}

export type UserAdditional = {
  profileImage: Nullable<{ url: string }>
  followers: User[] | []
  followings: User[] | []
}

export type UserWithAttributes = {
  id: number
  attributes: Omit<User, 'id'>
}

export type UserResponseWithAdditionalFields = User & UserAdditional

export type UserResponseWithProfileImage = User &
  Pick<UserAdditional, 'profileImage'>

export type UserResponseWithFollowings = User &
  Pick<UserAdditional, 'followings'>
