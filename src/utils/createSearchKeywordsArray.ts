type SearchKeywordsArray = string[]

type CreateSearchKeywordsArray = (searchKeyword: string) => SearchKeywordsArray

const createSearchKeywordsArray: CreateSearchKeywordsArray = searchKeyword => {
  const searchKeywords = searchKeyword.toLowerCase().split(' ').filter(Boolean)
  return searchKeywords
}

export default createSearchKeywordsArray
