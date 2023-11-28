type SearchKeywordsArray = string[]

const createSearchKeywordsArray = (
  searchKeyword: string
): SearchKeywordsArray => {
  const searchKeywords = searchKeyword.toLowerCase().split(' ').filter(Boolean)
  return searchKeywords
}

export default createSearchKeywordsArray
