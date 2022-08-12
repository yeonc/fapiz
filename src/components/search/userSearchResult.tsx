import styled from '@emotion/styled'
import UserSearchResultListItem from 'components/search/userSearchResultListItem'
import NoSearchResult from 'components/search/noSearchResult'
import Typo from 'components/common/typo'
import useSearchedUsers from 'hooks/useSearchedUsers'
import { UserForSearching } from 'types/user'
import { GRAY_HOVER_BACKGROUND } from 'styles/constants/color'
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
  margin-right: 30px;

  &:hover {
    background-color: ${GRAY_HOVER_BACKGROUND};
  }
`

type UserSearchResultProps = {
  searchKeyword: string
}

const UserSearchResult = ({ searchKeyword }: UserSearchResultProps) => {
  const { searchedUsers } = useSearchedUsers(searchKeyword)

  if (!searchedUsers) {
    return null
  }

  return (
    <section>
      <Typo {...searchResultHeadingTypoProps}>유저 검색 결과</Typo>
      <StyledUserSearchResultList>
        {searchedUsers.length === 0 ? (
          <NoSearchResult />
        ) : (
          searchedUsers.map(user => (
            <StyledUserSearchResultListItem key={user.id} user={user} />
          ))
        )}
      </StyledUserSearchResultList>
    </section>
  )
}

export default UserSearchResult
