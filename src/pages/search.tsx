import SearchForm from 'components/search/searchForm'
import SnsPostSearchResult from 'components/search/snsPostSearchResult'
import UserSearchResult from 'components/search/userSearchResult'
import withHeader from 'hocs/withHeader'

const SearchPage = () => (
  <>
    <SearchForm />
    <SnsPostSearchResult />
    <UserSearchResult />
  </>
)

export default withHeader(SearchPage)
