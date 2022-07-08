export type Object = {
  [key: string]: any
}

export type Id = {
  id: number
}

export type ObjectWithId = Object & Id

export type FashionItemInfo = {
  id: number
  category: string | ''
  price: number | ''
  buyingPlace: string | ''
}

export type PreviewImage = {
  url: string
  altText: string
}
