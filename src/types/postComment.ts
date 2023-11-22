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
