import { Nullable } from 'types/common'

export type ImageFiles = Nullable<FileList>

export type PreviewImage = {
  url: string
  altText: string
}

export type SnsPostImage = {
  url: string
  altText: string
}
