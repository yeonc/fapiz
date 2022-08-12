import { css } from '@emotion/react'
import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import ROUTE_URL from 'constants/routeUrl'
import { UserForSearching } from 'types/user'
import { setMarginBottom, setMarginRight } from 'styles/layout'

const linkStyle = css`
  display: block;
  padding: 16px;
  height: 200px;
  text-align: center;
`

const avatarStyle = css`
  width: 100px;
  height: 100px;
  margin: 0 auto 12px;
`

const fashionStyleTagStyle = css`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 18px;
  font-size: 14px;
  background-color: #a8b1ff83;
`

type UserSearchResultListItemProps = {
  className?: string
  user: UserForSearching
}

const UserSearchResultListItem = ({
  className,
  user,
}: UserSearchResultListItemProps) => (
  <li className={className}>
    <Link href={`${ROUTE_URL.SNS}/${user.id}`} css={linkStyle}>
      <Avatar src={user.avatarUrl} alt={user.username} css={avatarStyle} />
      <div css={setMarginBottom(10)}>
        <span css={setMarginRight(10)}>{user.username}</span>
        <span>{user.gender}</span>
      </div>
      <ul>
        {user.fashionStyles &&
          user.fashionStyles.map(fashionStyle => (
            <li key={fashionStyle.id} css={fashionStyleTagStyle}>
              #{fashionStyle.name}
            </li>
          ))}
      </ul>
    </Link>
  </li>
)

export default UserSearchResultListItem
