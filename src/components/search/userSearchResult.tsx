import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import UserSearchResultListItem from 'components/search/userSearchResultListItem'
import useUsers from 'hooks/useUsers'
import addBackendUrlToImageUrl from 'utils/addBackendUrlToImageUrl'

const StyledUserSearchResultList = styled.ul`
  display: flex;
`

const UserSearchResult = ({ searchKeyword }) => {
  const { users: usersFromStrapi } = useUsers()

  const users = usersFromStrapi.map(userFromStrapi => ({
    id: userFromStrapi.id,
    username: userFromStrapi.username,
    gender: userFromStrapi.gender,
    fashionStyles: userFromStrapi.fashionStyles ?? [],
    avatarUrl: addBackendUrlToImageUrl(userFromStrapi.profileImage?.url),
  }))

  return (
    <section>
      <Typography variant="h4" component="h2">
        유저 검색 결과
      </Typography>
      <StyledUserSearchResultList>
        {users.map(user => (
          <UserSearchResultListItem key={user.id} user={user} />
        ))}
      </StyledUserSearchResultList>
    </section>
  )
}

export default UserSearchResult
