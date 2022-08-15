import styled from '@emotion/styled'
import UserSearchResultListItem from 'components/search/userSearchResultListItem'
import UserSearchResultListItemSkeleton from 'components/search/userSearchResultListItemSkeleton'
import NoSearchResult from 'components/search/noSearchResult'
import Typo from 'components/common/typo'
import useSearchedUsers from 'hooks/useSearchedUsers'
import { HOVER_BACKGROUND_GRAY } from 'styles/constants/color'
import searchResultHeadingTypoProps from 'styles/props/searchResultHeadingTypoProps'

const StyledUserSearchResultList = styled.ul`
  display: flex;
`

const StyledUserSearchResultListItemSkeletonWrapper = styled.ul`
  display: flex;
`

const StyledUserSearchResultListItem = styled(UserSearchResultListItem)`
  margin-right: 20px;

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
}

const UserSearchResult = ({ searchKeyword }: UserSearchResultProps) => {
  const { searchedUsers } = useSearchedUsers(searchKeyword)

  return (
    <section>
      <Typo {...searchResultHeadingTypoProps}>유저 검색 결과</Typo>
      {searchedUsers ? (
        <>
          {searchedUsers.length === 0 && <NoSearchResult />}
          <StyledUserSearchResultList>
            {searchedUsers.map(user => (
              <StyledUserSearchResultListItem key={user.id} user={user} />
            ))}
          </StyledUserSearchResultList>
        </>
      ) : (
        <StyledUserSearchResultListItemSkeletonWrapper>
          <StyledUserSearchResultListItemSkeleton />
          <StyledUserSearchResultListItemSkeleton />
        </StyledUserSearchResultListItemSkeletonWrapper>
      )}
    </section>
  )
}

export default UserSearchResult
