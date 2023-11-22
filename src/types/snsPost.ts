import { Nullable } from 'types/common'
import { User, UserWithAttributes } from 'types/user'
import { FashionItemInfo } from 'types/fashion'
import { Image } from 'types/image'

export type SnsPostResponseAboutDefaultQuery = {
  id: number
  attributes: {
    content: Nullable<string>
    createdAt: string
    fashionItemsInfo: Nullable<FashionItemInfo[]>
    author: {
      data: UserWithAttributes
    }
    comments: {
      data: {
        id: number
      }[]
    }
    bookmarkUsers: {
      data: UserWithAttributes[]
    }
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
  }
}

export type SnsPostResponseAboutPostDetail = {
  id: number
  attributes: {
    content: Nullable<string>
    createdAt: string
    fashionItemsInfo: Nullable<FashionItemInfo[]>
    author: {
      data: {
        id: number
        attributes: Omit<User, 'id'> & {
          ProfileImage: {
            data: {
              id: number
              attributes: {
                url: string
                alternativeText: string
              }
            }
          }
        }
      }
    }
    bookmarkUsers: {
      data: UserWithAttributes[]
    }
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
  }
}

export type SnsPostResponseAboutSearchResult = {
  id: number
  attributes: {
    content: Nullable<string>
    createdAt: string
    fashionItemsInfo: Nullable<FashionItemInfo[]>
    author: {
      data: UserWithAttributes
    }
    comments: {
      data: {
        id: number
      }[]
    }
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
  }
}

export type SnsPostResponseAboutShowingAll = {
  id: number
  attributes: {
    content: Nullable<string>
    createdAt: string
    fashionItemsInfo: Nullable<FashionItemInfo[]>
    author: {
      data: UserWithAttributes
    }
    comments: {
      data: {
        id: number
      }[]
    }
    bookmarkUsers: {
      data: UserWithAttributes[]
    }
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
  }
}

export type SnsPostResponseAboutFiltering = {
  id: number
  attributes: {
    content: Nullable<string>
    createdAt: string
    fashionItemsInfo: Nullable<FashionItemInfo[]>
    postImages: {
      data: {
        id: number
        attributes: {
          url: string
          alternativeText: string
        }
      }[]
    }
    likeUsers: {
      data: UserWithAttributes[]
    }
    author: {
      data: UserWithAttributes
    }
  }
}

export type SnsPostForPostDetail = {
  id: number
  createdAt: string
  images: Image[]
  author: Pick<User, 'id' | 'username' | 'height' | 'weight'> & {
    avatarUrl: Nullable<string>
  }
  likeUsers: UserWithAttributes[]
  bookmarkUsers: UserWithAttributes[]
  content: Nullable<string>
  fashionItemsInfo: Nullable<FashionItemInfo[]>
}
