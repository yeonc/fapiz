import { FashionStyle, Nullable } from 'types'

export type AccessToken = Nullable<string>

export type LoginSuccessResponseData = {
  jwt: string
  user: {
    id: number
    username: string
    email: string
    gender: Nullable<string>
    height: Nullable<number>
    weight: Nullable<number>
    bodyShape: Nullable<string>
    fashionStyles: Nullable<FashionStyle[]>
    level: Nullable<number>
    points: Nullable<number>
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
  }
}
