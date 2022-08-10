import { Nullable } from 'types/common'
import { FashionStyle } from 'types/fashion'

export type UserForSearching = {
  id: number
  username: string
  gender: Nullable<string>
  fashionStyles: Nullable<FashionStyle[]>
  avatarUrl: string | undefined
}

export type LikeUserForMainPage = {
  id: number
  attributes: {
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
    height: Nullable<number>
    weight: Nullable<number>
    points: Nullable<number>
    level: Nullable<number>
    gender: Nullable<string>
    bodyShape: Nullable<string>
    fashionStyles: Nullable<FashionStyle[]>
  }
}

type FollowUserForUserInfo = {
  id: number
  username: string
  email: string
  provider: string
  password: null
  resetPasswordToken: null
  confirmationToken: null
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
  height: Nullable<number>
  weight: Nullable<number>
  points: Nullable<number>
  level: Nullable<number>
  gender: Nullable<string>
  bodyShape: Nullable<string>
  fashionStyles: Nullable<FashionStyle[]>
}

export type UserForUserInfo = {
  id: number
  username: string
  height: Nullable<number>
  weight: Nullable<number>
  profileImageUrl: string | undefined
  followings: FollowUserForUserInfo[]
  followers: FollowUserForUserInfo[]
}
