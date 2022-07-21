import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import UserSearchResultListItem from 'components/search/userSearchResultListItem'

const StyledUserSearchResultList = styled.ul`
  display: flex;
`

const UserSearchResult = () => (
  <section>
    <Typography variant="h4" component="h2">
      유저 검색 결과
    </Typography>
    <StyledUserSearchResultList>
      <UserSearchResultListItem />
      <UserSearchResultListItem />
      <UserSearchResultListItem />
      <UserSearchResultListItem />
      <UserSearchResultListItem />
    </StyledUserSearchResultList>
  </section>
)

export default UserSearchResult
