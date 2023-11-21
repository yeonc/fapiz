import { Image } from 'types/image'

export type FashionItemInfo = {
  id: number
  category: string
  price: number
  buyingPlace: string
}

type FashionStyleName =
  | '캐주얼'
  | '스트릿'
  | '빈티지'
  | '시크'
  | '페미닌'
  | '스포티'
  | '모던'
  | '럭셔리'
  | '댄디'
  | '클래식'
  | '아메카지'
  | '힙스터'

export type FashionStyle = {
  id: number
  name: FashionStyleName
}

export type FashionItemForCloset = {
  id: number
  category: string
  color: string
  image: Image
}

type FashionItem = {
  id: number
  attributes: {
    category: string
    color: string
    image: {
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

export type FashionItems = {
  data: FashionItem[]
}
