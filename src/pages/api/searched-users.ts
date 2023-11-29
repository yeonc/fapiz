import { NextApiRequest, NextApiResponse } from 'next'
import fetchUsers from 'services/user/fetchUsers'
import getSafeStringFromQuery from 'utils/getSafeStringFromQuery'
import { Nullable } from 'types/common'
import { User, UserResponseWithProfileImage } from 'types/user'

export type UserForSearching = Pick<
  User,
  'id' | 'username' | 'gender' | 'fashionStyles'
> & { avatarUrl?: string }

const searchUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  // 1. keyword 받아오기
  const searchKeyword = getSafeStringFromQuery(req.query.keyword)

  try {
    // 2. strapi 데이터 받아오기
    const response = await fetchUsers()
    const usersFromStrapi = response.data

    // 3. strapi에서 받아온 데이터 정제하기
    const users = sanitizeUsers(usersFromStrapi)

    // 4. 검색 로직 실행하기
    const searchedUsers = searchUser({ searchKeyword, users })

    // 5. 검색 결과 내려주기
    res.status(200).json(searchedUsers)
  } catch (error) {
    res.status(400).json(error)
  }
}

export default searchUsers

const sanitizeUsers = (
  usersFromStrapi: UserResponseWithProfileImage[]
): UserForSearching[] => {
  return usersFromStrapi.map(user => ({
    id: user.id,
    username: user.username,
    gender: user.gender,
    fashionStyles: user.fashionStyles,
    avatarUrl: user.profileImage?.url,
  }))
}

type SearchUserArgs = {
  searchKeyword: Nullable<string>
  users: UserForSearching[]
}

type SearchUser = (args: SearchUserArgs) => Nullable<UserForSearching[]>

const searchUser: SearchUser = ({ searchKeyword, users }) => {
  if (!searchKeyword) {
    return null
  }
  const searchKeywords = createSearchKeywordsArray(searchKeyword)
  const searchKeywordRegex = new RegExp(searchKeywords.join('|'), 'gi')
  const filteredUsers = filterUser({ users, searchKeywordRegex })
  return filteredUsers
}

const createSearchKeywordsArray = (searchKeyword: string): string[] => {
  const searchKeywords = searchKeyword.toLowerCase().split(' ').filter(Boolean)
  return searchKeywords
}

type FilterUserArgs = {
  users: UserForSearching[]
  searchKeywordRegex: RegExp
}

type FilterUser = (args: FilterUserArgs) => UserForSearching[]

const filterUser: FilterUser = ({ users, searchKeywordRegex }) => {
  const filteredUsers = users.filter(user => {
    const username = user.username.toLowerCase().trim()
    const matchedUsername = username.match(searchKeywordRegex)

    const fashionStylesArray = user.fashionStyles
      ? user.fashionStyles.map(fashionStyle => fashionStyle.name)
      : []
    const fashionStyleString = fashionStylesArray.join(' ')
    const matchedFashionStyles = fashionStyleString.match(searchKeywordRegex)

    return matchedUsername || matchedFashionStyles
  })

  return filteredUsers
}
