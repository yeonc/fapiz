import styled from '@emotion/styled'
import UserSearchResultListItem from 'components/search/userSearchResultListItem'
import UserSearchResultListItemSkeleton from 'components/search/userSearchResultListItemSkeleton'
import NoSearchResult from 'components/search/noSearchResult'
import SearchResultHeadingTypo from 'components/search/searchResultHeadingTypo'
import useSearchedUsers from 'hooks/useSearchedUsers'
import { HOVER_BACKGROUND_GRAY } from 'styles/constants/color'

const USER_SEARCH_RESULT_START_INDEX = 0
const USER_SEARCH_RESULT_COUNT_TO_BE_SHOWED = 5

const StyledUserSearchResultList = styled.ul`
  display: flex;
`

const StyledUserSearchResultListItemSkeletonWrapper = styled.ul`
  display: flex;
`

const StyledUserSearchResultListItem = styled(UserSearchResultListItem)`
  margin-right: 20px;
  width: 150px;

  &:hover {
    background-color: ${HOVER_BACKGROUND_GRAY};
  }
`

const StyledUserSearchResultListItemSkeleton = styled(
  UserSearchResultListItemSkeleton
)`
  margin-right: 20px;
`

type UserSearchResultProps = {
  searchKeyword: string
  className?: string
}

const UserSearchResult = ({
  searchKeyword,
  className,
}: UserSearchResultProps) => {
  const { searchedUsers, isLoading } = useSearchedUsers(searchKeyword)

  const searchedUsersToBeShowed = searchedUsers
    ? searchedUsers.slice(
        USER_SEARCH_RESULT_START_INDEX,
        USER_SEARCH_RESULT_COUNT_TO_BE_SHOWED
      )
    : []

  return (
    <section className={className}>
      <SearchResultHeadingTypo>유저 검색 결과</SearchResultHeadingTypo>
      {!isLoading ? (
        <>
          {searchedUsersToBeShowed.length === 0 && <NoSearchResult />}
          <StyledUserSearchResultList>
            {searchedUsersToBeShowed.map(user => (
              <StyledUserSearchResultListItem key={user.id} user={user} />
            ))}
          </StyledUserSearchResultList>
        </>
      ) : (
        <StyledUserSearchResultListItemSkeletonWrapper>
          <StyledUserSearchResultListItemSkeleton />
          <StyledUserSearchResultListItemSkeleton />
          <StyledUserSearchResultListItemSkeleton />
          <StyledUserSearchResultListItemSkeleton />
          <StyledUserSearchResultListItemSkeleton />
        </StyledUserSearchResultListItemSkeletonWrapper>
      )}
    </section>
  )
}

export default UserSearchResult
