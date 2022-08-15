import styled from '@emotion/styled'
import Link from '@mui/material/Link'
import Avatar from '@mui/material/Avatar'
import Typo from 'components/common/typo'
import addBackendUrlToImageUrl from 'utils/addBackendUrlToImageUrl'
import ROUTE_URL from 'constants/routeUrl'
import { horizontal, mgRight } from 'styles/layout'
import visuallyHidden from 'styles/visuallyHidden'

const StyledPostAuthorHeaderWrapper = styled.header`
  display: flex;
`
const StyledUserProfileTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const PostAuthorHeader = ({ author, popoverMenu }) => (
  <StyledPostAuthorHeaderWrapper>
    <Avatar
      alt={author.username}
      src={addBackendUrlToImageUrl(author.avatarUrl)}
      sx={{ width: 50, height: 50, marginRight: 2 }}
    />
    <StyledUserProfileTextWrapper>
      <Link href={`${ROUTE_URL.SNS}/${author.id}`}>
        <Typo variant="h6" component="h1">
          {author.username}
        </Typo>
      </Link>
      <dl css={horizontal}>
        {author.height && (
          <div css={mgRight(8)}>
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
      </dl>
    </StyledUserProfileTextWrapper>
    {popoverMenu}
  </StyledPostAuthorHeaderWrapper>
)

export default PostAuthorHeader
