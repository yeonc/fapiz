import { Id, Nullable } from 'types/common'
import { PostAuthorResponse, User, UserWithAttributes } from 'types/user'
import { FashionItemInfo } from 'types/fashion'
import {
  Image,
  ImageResponseWithAltText,
  ImageResponseWithoutAltText,
} from 'types/image'
import { PostCommentIdResponse } from './postComment'

type SnsPostResponseCommonAttributes = {
  content: Nullable<string>
  createdAt: string
  fashionItemInfos: Nullable<FashionItemInfo[]>
  likeUsers: {
    data: UserWithAttributes[]
  }
  postImages: {
    data: ImageResponseWithAltText[]
  }
}

type SnsPostResponseAdditionalAttributes = {
  author: {
    data: UserWithAttributes
  }
  comments: {
    data: PostCommentIdResponse[]
  }
  bookmarkUsers: {
    data: UserWithAttributes[]
  }
}

export type SnsPostResponseAboutDefaultQuery = {
  id: Id
  attributes: SnsPostResponseCommonAttributes &
    SnsPostResponseAdditionalAttributes
}

export type SnsPostResponseAboutPostDetail = {
  id: Id
  attributes: SnsPostResponseCommonAttributes &
    Pick<SnsPostResponseAdditionalAttributes, 'bookmarkUsers'> & {
      author: {
        data: PostAuthorResponse<ImageResponseWithAltText>
      }
    }
}

export type SnsPostResponseAboutSearchResult = {
  id: Id
  attributes: SnsPostResponseCommonAttributes &
    Pick<SnsPostResponseAdditionalAttributes, 'comments'> & {
      author: {
        data: PostAuthorResponse<ImageResponseWithoutAltText>
      }
    }
}

export type SnsPostResponseAboutShowingAll = {
  id: Id
  attributes: SnsPostResponseCommonAttributes &
    SnsPostResponseAdditionalAttributes
}

export type SnsPostResponseAboutFiltering = {
  id: Id
  attributes: SnsPostResponseCommonAttributes &
    Pick<SnsPostResponseAdditionalAttributes, 'author'>
}

export type SnsPostAuthorForPostDetail = Pick<
  User,
  'id' | 'username' | 'height' | 'weight'
> & {
  avatarUrl?: string
}

export type SnsPostForPostDetail = {
  id: Id
  createdAt: string
  images: Image[]
  author: SnsPostAuthorForPostDetail
  likeUsers: UserWithAttributes[]
  bookmarkUsers: UserWithAttributes[]
  content: string
  fashionItemInfos: FashionItemInfo[]
}
