import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'

const UserList = ({ users }) =>
  users.length === 0 ? (
    <p>해당하는 유저가 존재하지 않습니다.</p>
  ) : (
    <List>
      {users.map(user => (
        <ListItem
          key={user.id}
          secondaryAction={<Button variant="outlined">button</Button>}
        >
          <ListItemAvatar>
            <Avatar
              alt={user.username}
              src=""
              component="a"
              href={`/sns/${user.id}`}
            />
          </ListItemAvatar>
          <ListItemText secondary={`${user.height}cm ${user.weight}kg`}>
            <Link href={`/sns/${user.id}`} underline="hover">
              {user.username}
            </Link>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  )

export default UserList
