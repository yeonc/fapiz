import styled from '@emotion/styled'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import FollowToggleButton from 'components/common/buttons/followToggleButton'
import { Nullable } from 'types/common'
import { UserWithProfileImageAndFollowers } from 'types/user'
import { useAuth } from 'context/AuthContext'
import getIdsFromArrayOfObject from 'utils/getIdsFromArrayOfObject'
import ROUTE_URL from 'constants/routeUrl'

const StyledNoExistUser = styled.p`
  text-align: center;
  padding: 18px 0;
`

type UserListProps = {
  users: UserWithProfileImageAndFollowers[]
  afterFollow: () => void
}

const UserList = ({ users, afterFollow }: UserListProps) => {
  const { me } = useAuth()

  if (users.length === 0) {
    return (
      <StyledNoExistUser>해당하는 유저가 존재하지 않습니다.</StyledNoExistUser>
    )
  }

  return (
    <List>
      {users.map(user => (
        <ListItem
          key={user.id}
          secondaryAction={
            me && (
              <FollowToggleButton
                myId={me.id}
                targetUserId={user.id}
                targetUserFollowerIds={getIdsFromArrayOfObject(user.followers)}
                afterFollow={afterFollow}
              />
            )
          }
        >
          <ListItemAvatar>
            <Avatar
              alt={user.username}
              src={user.profileImage?.url}
              component="a"
              href={`${ROUTE_URL.SNS}/${user.id}`}
            />
          </ListItemAvatar>
          <ListItemText
            secondary={getUserBodyInfoText({
              height: user.height,
              weight: user.weight,
            })}
          >
            <Link href={`${ROUTE_URL.SNS}/${user.id}`}>{user.username}</Link>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  )
}

export default UserList

type UserBodyInfoText = string

type GetUserBodyInfoTextArgs = {
  height: Nullable<number>
  weight: Nullable<number>
}

type GetUserBodyInfoText = (args: GetUserBodyInfoTextArgs) => UserBodyInfoText

const getUserBodyInfoText: GetUserBodyInfoText = ({ height, weight }) => {
  if (!height && !weight) {
    return ''
  }

  if (height && !weight) {
    return `${height}cm`
  }

  if (!height && weight) {
    return `${weight}kg`
  }

  return `${height}cm ${weight}kg`
}
