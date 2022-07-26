import { Nullable } from 'types/common'
import { FashionStyle } from 'types/fashion'

export type UserForSearching = {
  id: number
  username: string
  gender: Nullable<string>
  fashionStyles: Nullable<FashionStyle[]>
  avatarUrl: string | undefined
}
