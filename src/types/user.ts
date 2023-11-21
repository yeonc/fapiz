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
  profileImage: Nullable<{ url: string }>
  followers: User[] | []
  followings: User[] | []
}

export type UserWithAttributes = {
  id: number
  attributes: Omit<User, 'id'>
}

export type UserForSearching = Pick<
  User,
  'id' | 'username' | 'gender' | 'fashionStyles'
> & { avatarUrl: Nullable<string> }

export type UserForMyInfo = Omit<
  User,
  'profileImage' | 'followers' | 'followings'
> & { imageUrl: Nullable<string> }
