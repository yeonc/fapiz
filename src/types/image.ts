import { Nullable } from 'types/common'

export type ImageFiles = Nullable<FileList>
export type UploadedImageId = number
export type Image = {
  url: string
  altText: string
}
