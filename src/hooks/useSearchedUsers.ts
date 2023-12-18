import useSWR from 'swr'
import ROUTE_URL from 'constants/routeUrl'
import { UserForSearching } from 'pages/api/searched-users'

const useSearchedUsers = (searchKeyword: string) => {
  const { data, error } = useSWR<UserForSearching[], Error>({
    baseURL: ROUTE_URL.HOME,
    url: '/api/searched-users',
    config: {
      params: {
        keyword: searchKeyword,
      },
    },
  })

  return {
    searchedUsers: data,
    isLoading: !data && !error,
    error,
  }
}

export default useSearchedUsers
