import Avatar from '@mui/material/Avatar'
import { BACKEND_URL } from 'constants/constants'

const UserAvatar = ({ profileImageUrl, username, styleConfig }) => (
  <Avatar alt={username} src={BACKEND_URL + profileImageUrl} sx={styleConfig} />
)

export default UserAvatar
