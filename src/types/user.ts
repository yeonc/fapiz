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
