import { css } from '@emotion/react'
import Skeleton from '@mui/material/Skeleton'
import { setMarginBottom } from 'styles/layout'

const listItemStyle = css`
  display: block;
  padding: 16px;
  width: 150px;
  height: 200px;
  text-align: center;
`

const avatarStyle = css`
  width: 100px;
  height: 100px;
  margin: 0 auto 12px;
`

type UserSearchResultListItemSkeletonProps = {
  className?: string
}

const UserSearchResultListItemSkeleton = ({
  className,
}: UserSearchResultListItemSkeletonProps) => (
  <li className={className} css={listItemStyle}>
    <Skeleton animation="wave" variant="circular" css={avatarStyle} />
    <Skeleton animation="wave" height={10} css={setMarginBottom(10)} />
    <Skeleton animation="wave" height={10} />
  </li>
)

export default UserSearchResultListItemSkeleton
