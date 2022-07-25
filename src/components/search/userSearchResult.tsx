import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import UserSearchResultListItem from 'components/search/userSearchResultListItem'
import NoSearchResult from 'components/search/noSearchResult'
import useSearchedUsers from 'hooks/useSearchedUsers'

const StyledUserSearchResultList = styled.ul`
  display: flex;
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
      <Typography variant="h4" component="h2">
        유저 검색 결과
      </Typography>
      <StyledUserSearchResultList>
        {searchedUsers.length === 0 ? (
          <NoSearchResult />
        ) : (
          searchedUsers.map(user => (
            <UserSearchResultListItem key={user.id} user={user} />
          ))
        )}
      </StyledUserSearchResultList>
    </section>
  )
}

export default UserSearchResult
