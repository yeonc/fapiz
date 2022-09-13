import styled from '@emotion/styled'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import FollowToggleButton from 'components/common/buttons/followToggleButton'
import { Nullable } from 'types/common'

type UserBodyInfoText = string

type GetUserBodyInfoTextArgs = {
  height: Nullable<number>
  weight: Nullable<number>
}

type GetUserBodyInfoText = (
  args: GetUserBodyInfoTextArgs
) => UserBodyInfoText | undefined

const StyledNoExistUser = styled.p`
  text-align: center;
  padding: 18px 0;
`

const UserList = ({ users, me, afterFollow }) => {
  if (users.length === 0) {
    return (
      <StyledNoExistUser>해당하는 유저가 존재하지 않습니다.</StyledNoExistUser>
    )
  }

  const getUserBodyInfoText: GetUserBodyInfoText = ({ height, weight }) => {
    if (!height && !weight) {
      return
    }

    if (height && !weight) {
      return `${height}cm`
    }

    if (!height && weight) {
      return `${weight}kg`
    }

    return `${height}cm ${weight}kg`
  }

  return (
    <List>
      {users.map((user: any) => (
        <ListItem
          key={user.id}
          secondaryAction={
            <FollowToggleButton
              myId={me.id}
              myFollowings={me.followings}
              targetUserId={user.id}
              afterFollow={afterFollow}
            />
          }
        >
          <ListItemAvatar>
            <Avatar
              alt={user.username}
              src={user.profileImage?.url}
              component="a"
              href={`/sns/${user.id}`}
            />
          </ListItemAvatar>
          <ListItemText
            secondary={getUserBodyInfoText({
              height: user.height,
              weight: user.weight,
            })}
          >
            <Link href={`/sns/${user.id}`}>{user.username}</Link>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  )
}

export default UserList
