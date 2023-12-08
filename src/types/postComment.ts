import { Id } from './common'
import { ImageResponseWithoutAltText } from './image'

export type PostCommentResponse = {
  id: Id
  attributes: {
    content: string
    createdAt: string
    author: {
      data: {
        id: Id
        attributes: {
          username: string
          profileImage: {
            data: ImageResponseWithoutAltText
          }
        }
      }
    }
  }
}

export type PostCommentIdResponse = {
  id: Id
}
