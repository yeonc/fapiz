import { Nullable } from 'types/common'
import { User, UserWithAttributes } from 'types/user'
import { FashionItemInfo, FashionStyle } from 'types/fashion'
import { Image } from 'types/image'

export type SnsPost = {
  id: number
  attributes: {
    author: {
      data: UserWithAttributes
    }
    comments: {
      data: {
        id: number
      }[]
    }
    bookmarkUsers: {
      data: {
        id: number
        attributes: Omit<User, 'id'>
      }[]
    }
    content: Nullable<string>
    createdAt: string
    fashionItemsInfo: Nullable<FashionItemInfo[]>
    likeUsers: {
      data: UserWithAttributes[]
    }
    postImages: {
      data: {
        id: number
        attributes: {
          url: string
          alternativeText: string
        }
      }[]
    }
    publishedAt: Date
  }
}

export type SnsPostForSearching = {
  id: number
  createdAt: string
  firstImage: Image
  content: Nullable<string>
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
  likeUsers: UserWithAttributes[]
}

export type SnsPostForSnsPostsPage = {
  id: number
  firstImage: Image
}
