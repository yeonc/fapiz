import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const FollowingList = ({ following }) =>
  following.length === 0 ? (
    <p>팔로잉 한 사람이 존재하지 않습니다.</p>
  ) : (
    <List>
      {following.map(person => (
        <ListItem
          key={person.id}
          secondaryAction={<Button variant="outlined">button</Button>}
        >
          <ListItemAvatar>
            <Avatar alt={person.username} src="" />
          </ListItemAvatar>
          <ListItemText
            primary={person.username}
            secondary={`${person.height}cm ${person.weight}kg`}
          />
        </ListItem>
      ))}
    </List>
  )

const FollowingListModal = ({ onClose, open, following }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalBoxStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Following
        </Typography>
        <FollowingList following={following} />
      </Box>
    </Modal>
  )
}

export default FollowingListModal
