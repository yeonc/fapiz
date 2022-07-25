import { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosResponse } from 'axios'
import addBackendUrlToImageUrl from 'utils/addBackendUrlToImageUrl'
import createSearchKeywordsArray from 'utils/createSearchKeywordsArray'
import { BACKEND_URL } from 'constants/constants'
import { FashionStyle } from 'types/fashion'
import { UserForSearching } from 'types/user'

const fetchUsers = async (): Promise<AxiosResponse> => {
  return axios({
    method: 'get',
    url: `${BACKEND_URL}/api/users`,
  })
}

const sanitizeUsers = (usersFromStrapi): UserForSearching[] => {
  const sanitizedUsers = usersFromStrapi.map(userFromStrapi => ({
    id: userFromStrapi.id,
    username: userFromStrapi.username,
    gender: userFromStrapi.gender,
    fashionStyles: userFromStrapi.fashionStyles ?? [],
    avatarUrl: addBackendUrlToImageUrl(userFromStrapi.profileImage?.url),
  }))

  return sanitizedUsers
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

type SearchUserArgs = {
  searchKeyword: string
  initialUsers: UserForSearching[]
}

type SearchUser = (args: SearchUserArgs) => UserForSearching[]

const searchUser: SearchUser = ({ searchKeyword, initialUsers }) => {
  const searchKeywords = createSearchKeywordsArray(searchKeyword)
  const searchKeywordRegex = new RegExp(searchKeywords.join('|'), 'gi')
  const filteredUsers = filterUser({ initialUsers, searchKeywordRegex })
  return filteredUsers
}

const searchUsers = async (
  req: NextApiRequest,
  res: NextApiResponse<UserForSearching[]>
) => {
  // 1. keyword 받아오기
  const searchKeyword = req.query.keyword as string

  // 2. strapi 데이터 받아오기
  let usersFromStrapi
  try {
    const response = await fetchUsers()
    usersFromStrapi = response.data
  } catch (error) {
    console.error(error)
  }

  // 3. strapi에서 받아온 데이터 정제하기
  const users = sanitizeUsers(usersFromStrapi)

  // 4. 검색 로직 실행하기
  const searchedUsers = searchUser({ searchKeyword, initialUsers: users })

  // 5. 검색 결과 내려주기
  res.status(200).json(searchedUsers)
}

export default searchUsers
