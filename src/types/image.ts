import { Nullable } from 'types/common'

export type ImageFiles = Nullable<FileList>

export type UploadedImageId = number

export type Image = {
  url: string
  altText: string
}

export type UploadImageResponse = { id: number }[]

export type ImageResponseWithAltText = {
  id: number
  attributes: {
    url: string
    alternativeText: string
  }
}

export type ImageResponseWithoutAltText = {
  id: number
  attributes: {
    url: string
  }
}
