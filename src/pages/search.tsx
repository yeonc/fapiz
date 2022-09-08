import { useState } from 'react'
import styled from '@emotion/styled'
import withHeader from 'hocs/withHeader'
import SearchForm from 'components/search/searchForm'
import SnsPostSearchResult from 'components/search/snsPostSearchResult'
import UserSearchResult from 'components/search/userSearchResult'
import Typo from 'components/common/typo'
import MaxWidthContainer from 'components/layouts/containers/maxWidthContainer'
import visuallyHidden from 'styles/visuallyHidden'

const StyledSearchPageWrapper = styled.div`
  padding: 30px 0;
`

const StyledSearchFormWrapper = styled.div`
  text-align: center;
`

const StyledSearchResultWrapper = styled.section`
  padding: 60px 0;
`

const MessageBeforeSearching = (
  <Typo>검색어를 입력하여 SNS 게시물과 유저들을 찾아보세요!</Typo>
)

const StyledSnsPostSearchResult = styled(SnsPostSearchResult)`
  margin-bottom: 60px;
`

const SearchPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('')

  const onSearchKeywordSubmit = (keyword: string) => {
    setSearchKeyword(keyword)
  }

  return (
    <MaxWidthContainer>
      <StyledSearchPageWrapper>
        <h1 css={visuallyHidden}>통합 검색 결과 페이지</h1>
        <StyledSearchFormWrapper>
          {!searchKeyword && MessageBeforeSearching}
          <SearchForm onSearchKeywordSubmit={onSearchKeywordSubmit} />
        </StyledSearchFormWrapper>
        {searchKeyword && (
          <StyledSearchResultWrapper>
            <StyledSnsPostSearchResult searchKeyword={searchKeyword} />
            <UserSearchResult searchKeyword={searchKeyword} />
          </StyledSearchResultWrapper>
        )}
      </StyledSearchPageWrapper>
    </MaxWidthContainer>
  )
}

export default withHeader(SearchPage)
