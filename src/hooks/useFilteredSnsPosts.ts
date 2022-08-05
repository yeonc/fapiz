import useSWR from 'swr'
import ROUTE_URL from 'constants/routeUrl'
import { SnsPostForMainPage } from 'types/snsPost'

const useFilteredSnsPosts = () => {
  const myFashionStyles = [
    {
      id: 7,
      name: '모던',
    },
    {
      id: 11,
      name: '아메카지',
    },
  ]

  const myFashionStylesString = JSON.stringify(myFashionStyles)
  const encodedMyFashionStyles = encodeURIComponent(myFashionStylesString)

  const { data, error } = useSWR<SnsPostForMainPage[]>({
    baseURL: ROUTE_URL.HOME,
    url: '/api/filtered-sns-posts',
    config: {
      params: {
        pageNumber: 1,
        pageSize: 20,
        isLoggedIn: true,
        myGender: '남',
        myBodyShape: '역삼각형',
        myFashionStyles: encodedMyFashionStyles,
      },
    },
  })

  return {
    filteredSnsPosts: data,
    isFilteredSnsPostsLoading: !data && !error,
    error,
  }
}

export default useFilteredSnsPosts
