import { useState } from 'react'
import styled from '@emotion/styled'
import withHeader from 'hocs/withHeader'
import SearchForm from 'components/search/searchForm'
import SnsPostSearchResult from 'components/search/snsPostSearchResult'
import UserSearchResult from 'components/search/userSearchResult'
import Typo from 'components/common/typo'
import MaxWidthContainer from 'components/layouts/containers/maxWidthContainer'
import visuallyHidden from 'styles/visuallyHidden'
import { mgBottom } from 'styles/layout'
import Head from 'next/head'

const StyledSearchPageWrapper = styled.div`
  padding: 30px 0;
`

const StyledSearchFormWrapper = styled.div`
  text-align: center;
`

const StyledSearchResultWrapper = styled.section`
  padding: 60px 0;
`

const StyledUserSearchResult = styled(UserSearchResult)`
  margin-bottom: 50px;
`

const MessageBeforeSearching = (
  <Typo css={mgBottom(24)}>
    검색어를 입력하여 <strong>SNS 게시물</strong>과 <strong>유저</strong>를
    찾아보세요!
  </Typo>
)

const SearchPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('')

  const onSearchKeywordSubmit = (keyword: string) => {
    setSearchKeyword(keyword)
  }

  return (
    <>
      <Head>
        <title>검색 | Fapiz</title>
        <meta name="description" content="유저와 SNS 게시물을 검색해 보세요" />
      </Head>
      <MaxWidthContainer>
        <StyledSearchPageWrapper>
          <h1 css={visuallyHidden}>통합 검색 결과 페이지</h1>
          <StyledSearchFormWrapper>
            {!searchKeyword && MessageBeforeSearching}
            <SearchForm onSearchKeywordSubmit={onSearchKeywordSubmit} />
          </StyledSearchFormWrapper>
          {searchKeyword && (
            <StyledSearchResultWrapper>
              <StyledUserSearchResult searchKeyword={searchKeyword} />
              <SnsPostSearchResult searchKeyword={searchKeyword} />
            </StyledSearchResultWrapper>
          )}
        </StyledSearchPageWrapper>
      </MaxWidthContainer>
    </>
  )
}

export default withHeader(SearchPage)
