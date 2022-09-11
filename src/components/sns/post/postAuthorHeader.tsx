import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import Link from '@mui/material/Link'
import Avatar from '@mui/material/Avatar'
import Typo from 'components/common/typo'
import ROUTE_URL from 'constants/routeUrl'
import { mgRight } from 'styles/layout'
import visuallyHidden from 'styles/visuallyHidden'

const StyledPostAuthorHeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledAuthorInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`

const StyledAuthorBodyInfoWrapper = styled.dl`
  display: flex;
  font-size: 16px;
`

const authorAvatarStyle = css`
  width: 50px;
  height: 50px;
  margin-right: 16px;
`

type PostAuthorHeaderProps = {
  author: any // TODO: 타입 정의하기
  popoverMenu: EmotionJSX.Element | null
  className?: string
}

const PostAuthorHeader = ({
  author,
  popoverMenu,
  className,
}: PostAuthorHeaderProps) => (
  <StyledPostAuthorHeaderWrapper className={className}>
    <StyledAuthorInfoWrapper>
      <Avatar
        alt={author.username}
        src={author.avatarUrl}
        css={authorAvatarStyle}
      />
      <div>
        <Link href={`${ROUTE_URL.SNS}/${author.id}`}>
          <Typo variant="h6" component="h1">
            {author.username}
          </Typo>
        </Link>
        <StyledAuthorBodyInfoWrapper>
          {author.height && (
            <div css={mgRight(6)}>
              <dt css={visuallyHidden}>키</dt>
              <dd>{author.height}cm</dd>
            </div>
          )}
          {author.weight && (
            <div>
              <dt css={visuallyHidden}>몸무게</dt>
              <dd>{author.weight}kg</dd>
            </div>
          )}
        </StyledAuthorBodyInfoWrapper>
      </div>
    </StyledAuthorInfoWrapper>
    {popoverMenu}
  </StyledPostAuthorHeaderWrapper>
)

export default PostAuthorHeader
