import useSWR from 'swr'
import ROUTE_URL from 'constants/routeUrl'
import { UserForSearching } from 'types/user'

const NEXT_SERVER_SEARCHED_USERS_API_ENDPOINT = '/api/searched-users'

const useSearchedUsers = (searchKeyword: string) => {
  const { data, error } = useSWR<UserForSearching[], Error>({
    baseURL: ROUTE_URL.HOME,
    url: NEXT_SERVER_SEARCHED_USERS_API_ENDPOINT,
    config: {
      params: {
        keyword: searchKeyword,
      },
    },
  })

  return {
    searchedUsers: data,
    isSearchedUsersLoading: !data && !error,
    error,
  }
}

export default useSearchedUsers
