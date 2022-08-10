import { Nullable } from 'types/common'
import { LikeUserForMainPage } from 'types/user'
import { FashionStyle } from 'types/fashion'
import { SnsPostImage } from 'types/image'

export type SnsPostForSearching = {
  id: number
  createdAt: string
  firstImage: SnsPostImage
  content: string
  likeNumbers: number
  author: {
    username: string
    avatarUrl: string | undefined
  }
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
  postImage: SnsPostImage
  likeUsers: LikeUserForMainPage[]
}

export type SnsPostForSnsPostsPage = {
  id: number
  firstImage: SnsPostImage
}
