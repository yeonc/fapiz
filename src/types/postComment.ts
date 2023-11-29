import { ImageResponseWithoutAltText } from './image'

export type PostCommentResponse = {
  id: number
  attributes: {
    content: string
    createdAt: string
    author: {
      data: {
        id: number
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
  id: number
}
