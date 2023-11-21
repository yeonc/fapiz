import { Nullable } from 'types/common'
import { LikeUser } from 'types/user'
import { FashionStyle } from 'types/fashion'
import { Image } from 'types/image'

export type SnsPostForSearching = {
  id: number
  createdAt: string
  firstImage: Image
  content: string
  likeNumbers: number
  author: {
    username: string
    avatarUrl: string | undefined
  }
  commentCount: number
}

export type SnsPostForMainPage = {
  id: number
  createdAt: string
  author: {
    username: string
    gender: Nullable<string>
    bodyShape: Nullable<string>
    fashionStyles: Nullable<FashionStyle[]>
  }
  postImage: Image
  likeUsers: LikeUser[]
}

export type SnsPostForSnsPostsPage = {
  id: number
  firstImage: Image
}
