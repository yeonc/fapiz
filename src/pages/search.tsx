import { useState } from 'react'
import SearchForm from 'components/search/searchForm'
import SnsPostSearchResult from 'components/search/snsPostSearchResult'
import UserSearchResult from 'components/search/userSearchResult'
import withHeader from 'hocs/withHeader'

const SearchPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('')

  const onSearchKeywordSubmit = (keyword: string) => {
    setSearchKeyword(keyword)
  }

  return (
    <>
      <SearchForm onSearchKeywordSubmit={onSearchKeywordSubmit} />
      {searchKeyword ? (
        <>
          <SnsPostSearchResult searchKeyword={searchKeyword} />
          <UserSearchResult searchKeyword={searchKeyword} />
        </>
      ) : null}
    </>
  )
}

export default withHeader(SearchPage)
