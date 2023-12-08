import { Id, Nullable } from 'types/common'

export type ImageFiles = Nullable<FileList>

export type UploadedImageId = number

export type Image = {
  url: string
  altText: string
}

export type UploadImageResponse = { id: Id }[]

export type ImageResponseWithAltText = {
  id: Id
  attributes: {
    url: string
    alternativeText: string
  }
}

export type ImageResponseWithoutAltText = {
  id: Id
  attributes: {
    url: string
  }
}
