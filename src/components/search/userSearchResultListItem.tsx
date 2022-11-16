import { css } from '@emotion/react'
import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import ROUTE_URL from 'constants/routeUrl'
import { UserForSearching } from 'types/user'
import { mgBottom } from 'styles/layout'
import {
  DEFAULT_BLACK,
  FASHION_STYLE_TAG_BACKGROUND_GRAY,
} from 'styles/constants/color'

const DIVIDER = ' / '
const NO_DIVIDER = ''

const linkStyle = css`
  display: block;
  padding: 16px;
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
  margin-bottom: 2px;
  font-size: 14px;
  background-color: ${FASHION_STYLE_TAG_BACKGROUND_GRAY};
`

type UserSearchResultListItemProps = {
  className?: string
  user: UserForSearching
}

const UserSearchResultListItem = ({
  className,
  user,
}: UserSearchResultListItemProps) => {
  return (
    <li className={className}>
      <Link
        href={`${ROUTE_URL.SNS}/${user.id}`}
        css={linkStyle}
        color={DEFAULT_BLACK}
      >
        <Avatar src={user.avatarUrl} alt={user.username} css={avatarStyle} />
        <div css={mgBottom(10)}>
          <span>
            {user.username}
            {user.gender ? DIVIDER : NO_DIVIDER}
            {user.gender}
          </span>
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
}

export default UserSearchResultListItem
