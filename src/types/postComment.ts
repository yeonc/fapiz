import { Nullable } from './common'

export type PostComment = {
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
            data: {
              id: number
              attributes: {
                url: string
              }
            }
          }
        }
      }
    }
  }
}

export type PostCommentForSnsPost = {
  id: number
  createdAt: string
  content: string
  authorId: number
  authorName: string
  authorProfileImageUrl: Nullable<string>
}
