import styled from '@emotion/styled'
import Link from '@mui/material/Link'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { horizontal, setMarginRight } from 'styles/layout'
import visuallyHidden from 'styles/visuallyHidden'
import addBackendUrlToImageUrl from 'utils/addBackendUrlToImageUrl'
import ROUTE_URL from 'constants/routeUrl'

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
        <Typography variant="h6" component="h1">
          {author.username}
        </Typography>
      </Link>
      <dl css={horizontal}>
        {author.height && (
          <div css={setMarginRight(8)}>
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
