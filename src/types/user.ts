import { Id, Nullable } from 'types/common'
import { FashionStyle } from 'types/fashion'

export type Gender = '남' | '여'
export type BodyShape =
  | '삼각형'
  | '역삼각형'
  | '타원형'
  | '직사각형'
  | '모래시계형'
  | '사다리꼴형'

export type User = {
  id: Id
  username: string
  gender: Nullable<Gender>
  height: Nullable<number>
  weight: Nullable<number>
  bodyShape: Nullable<BodyShape>
  fashionStyles: Nullable<FashionStyle[]>
}

export type UserAdditional = {
  profileImage: Nullable<{ url: string }>
  followers: User[]
  followings: User[]
}

export type UserWithAttributes = {
  id: Id
  attributes: Omit<User, 'id'>
}

export type UserResponse = User &
  Pick<UserAdditional, 'profileImage' | 'followings'>

export type UserWithProfileImage = User & Pick<UserAdditional, 'profileImage'>

export type UserWithProfileImageAndFollowers = User &
  Pick<UserAdditional, 'profileImage' | 'followers'>

export type UserResponseWithAdditionalFields = User &
  Pick<UserAdditional, 'profileImage'> & {
    followers: UserWithProfileImageAndFollowers[]
    followings: UserWithProfileImageAndFollowers[]
  }

export type UserResponseWithProfileImage = UserWithProfileImage

export type UserResponseWithFollowings = User &
  Pick<UserAdditional, 'followings'>

export type PostAuthorResponse<T> = {
  id: Id
  attributes: Omit<User, 'id'> & {
    profileImage: {
      data: T
    }
  }
}
