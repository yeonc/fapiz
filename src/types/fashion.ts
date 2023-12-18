import { Id, Nullable } from './common'
import { ImageResponseWithAltText } from './image'

export type FashionItemInfo = {
  id: Id
  category: FashionItemCategoryName | ''
  price: Nullable<number>
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
  id: Id
  name: FashionStyleName
}

export type FashionItemCategoryName =
  | '상의'
  | '하의'
  | '원피스'
  | '아우터'
  | '신발'
  | '가방'
  | '모자'
  | '액세서리'

export type FashionItemCategory = {
  id: Id
  name: FashionItemCategoryName
}

export type FashionItemResponse = {
  id: Id
  attributes: {
    category: string
    color: string
    image: {
      data: ImageResponseWithAltText
    }
  }
}
