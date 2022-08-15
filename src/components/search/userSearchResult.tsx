import styled from '@emotion/styled'
import UserSearchResultListItem from 'components/search/userSearchResultListItem'
import UserSearchResultListItemSkeleton from 'components/search/userSearchResultListItemSkeleton'
import NoSearchResult from 'components/search/noSearchResult'
import Typo from 'components/common/typo'
import useSearchedUsers from 'hooks/useSearchedUsers'
import { UserForSearching } from 'types/user'
import { HOVER_BACKGROUND_GRAY } from 'styles/constants/color'
import searchResultHeadingTypoProps from 'styles/props/searchResultHeadingTypoProps'

const StyledUserSearchResultList = styled.ul`
  display: flex;
`

type UserSearchResultListItemComponentProps = {
  className?: string
  user: UserForSearching
}

const UserSearchResultListItemComponent = ({
  className,
  user,
}: UserSearchResultListItemComponentProps) => (
  <UserSearchResultListItem className={className} user={user} />
)

const StyledUserSearchResultListItem = styled(
  UserSearchResultListItemComponent
)`
  margin-right: 20px;

  &:hover {
    background-color: ${HOVER_BACKGROUND_GRAY};
  }
`

type UserSearchResultListItemSkeletonComponentProps = {
  className?: string
}

const UserSearchResultListItemSkeletonComponent = ({
  className,
}: UserSearchResultListItemSkeletonComponentProps) => (
  <UserSearchResultListItemSkeleton className={className} />
)

const StyledUserSearchResultListItemSkeleton = styled(
  UserSearchResultListItemSkeletonComponent
)`
  margin-right: 20px;
`

const StyledUserSearchResultListItemSkeletonWrapper = styled.ul`
  display: flex;
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
