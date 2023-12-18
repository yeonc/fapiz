import { UserForSnsUserInfo } from 'components/sns/user/userInfo'
import { UserForSearching } from 'pages/api/searched-users'
import { UserForMyInfo } from 'pages/my-info'
import {
  UserResponseWithAdditionalFields,
  UserResponseWithProfileImage,
} from 'types/user'

export const sanitizeUserForSnsUserInfo = (
  user: UserResponseWithAdditionalFields
): UserForSnsUserInfo => ({
  id: user.id,
  username: user.username,
  height: user.height,
  weight: user.weight,
  profileImageUrl: user.profileImage?.url,
  followers: user.followers,
  followings: user.followings,
})

export const sanitizeUserForMyInfo = (
  user: UserResponseWithProfileImage
): UserForMyInfo => ({
  id: user.id,
  imageUrl: user.profileImage?.url,
  username: user.username,
  gender: user.gender || '',
  height: user.height,
  weight: user.weight,
  bodyShape: user.bodyShape || '',
  fashionStyles: user.fashionStyles || [],
})

export const sanitizeUsersForSearching = (
  users: UserResponseWithProfileImage[]
): UserForSearching[] => {
  return users.map(user => ({
    id: user.id,
    username: user.username,
    gender: user.gender,
    fashionStyles: user.fashionStyles,
    avatarUrl: user.profileImage?.url,
  }))
}
