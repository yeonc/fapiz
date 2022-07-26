import { Nullable } from 'types/common'

export type ImageFiles = Nullable<File[]>

export type PreviewImage = {
  url: string
  altText: string
}
