import { NextApiRequest, NextApiResponse } from 'next'
import fetchUsers from 'services/user/fetchUsers'
import createSearchKeywordsArray from 'utils/createSearchKeywordsArray'
import getSafeStringFromQuery from 'utils/getSafeStringFromQuery'
import { FashionStyle } from 'types/fashion'
import { UserForSearching } from 'types/user'
import { Nullable } from 'types/common'

const searchUsers = async (
  req: NextApiRequest,
  res: NextApiResponse<Nullable<UserForSearching[]>>
) => {
  // 1. keyword 받아오기
  const searchKeyword = getSafeStringFromQuery(req.query.keyword)

  try {
    // 2. strapi 데이터 받아오기
    const response = await fetchUsers()
    const usersFromStrapi = response.data

    // 3. strapi에서 받아온 데이터 정제하기
    const users = sanitizeUsers(usersFromStrapi)

    // 4. 검색 로직 실행하기
    const searchedUsers = searchUser({ searchKeyword, initialUsers: users })

    // 5. 검색 결과 내려주기
    res.status(200).json(searchedUsers)
  } catch (error) {
    res.status(400).json(error)
  }
}

export default searchUsers

const sanitizeUsers = (usersFromStrapi): UserForSearching[] => {
  const sanitizedUsers = usersFromStrapi.map(userFromStrapi => ({
    id: userFromStrapi.id,
    username: userFromStrapi.username,
    gender: userFromStrapi.gender,
    fashionStyles: userFromStrapi.fashionStyles ?? [],
    avatarUrl: userFromStrapi.profileImage?.url,
  }))

  return sanitizedUsers
}

type SearchUserArgs = {
  searchKeyword: Nullable<string>
  initialUsers: UserForSearching[]
}

type SearchUser = (args: SearchUserArgs) => Nullable<UserForSearching[]>

const searchUser: SearchUser = ({ searchKeyword, initialUsers }) => {
  if (!searchKeyword) {
    return null
  }

  const searchKeywords = createSearchKeywordsArray(searchKeyword)
  const searchKeywordRegex = new RegExp(searchKeywords.join('|'), 'gi')
  const filteredUsers = filterUser({ initialUsers, searchKeywordRegex })
  return filteredUsers
}

type FilterUserArgs = {
  initialUsers: UserForSearching[]
  searchKeywordRegex: RegExp
}

type FilterUser = (args: FilterUserArgs) => UserForSearching[]

const filterUser: FilterUser = ({ initialUsers, searchKeywordRegex }) => {
  const filteredUsers = initialUsers.filter(user => {
    const username = user.username.toLowerCase().trim()
    const matchedUsername = username.match(searchKeywordRegex)

    const fashionStylesArray = user.fashionStyles
      ? user.fashionStyles.map(
          (fashionStyle: FashionStyle) => fashionStyle.name
        )
      : []
    const fashionStyleString = fashionStylesArray.join(' ')
    const matchedFashionItems = fashionStyleString.match(searchKeywordRegex)

    return matchedUsername || matchedFashionItems
  })

  return filteredUsers
}
