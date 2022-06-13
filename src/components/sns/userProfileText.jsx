import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import { horizontal, mgRight } from 'styles/layout'
import visuallyHidden from 'styles/visuallyHidden'

const UserProfileTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const UserProfileText = ({ username, height, weight, usernameTypoVarient }) => (
  <UserProfileTextWrapper>
    <Typography variant={usernameTypoVarient} component="h1">
      {username}
    </Typography>
    <dl css={horizontal}>
      <div css={mgRight(8)}>
        <dt css={visuallyHidden}>키</dt>
        <dd>{height}cm</dd>
      </div>
      <div>
        <dt css={visuallyHidden}>몸무게</dt>
        <dd>{weight}kg</dd>
      </div>
    </dl>
  </UserProfileTextWrapper>
)

export default UserProfileText
