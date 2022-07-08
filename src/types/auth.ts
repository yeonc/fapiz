import { FashionStyle } from 'types'

export type LoginSuccessResponseData = {
  jwt: string
  user: {
    id: number
    username: string
    email: string
    gender?: string
    height?: number
    weight?: number
    bodyShape?: string
    fashionStyles?: FashionStyle[]
    level?: number
    points?: number
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
  }
}
