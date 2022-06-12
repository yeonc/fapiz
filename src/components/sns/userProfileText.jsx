import { horizontal, mgRight } from 'styles/layout'
import visuallyHidden from 'styles/visuallyHidden'

const UserProfileText = ({ username, height, weight }) => (
  <>
    <h1>{username}</h1>
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
  </>
)

export default UserProfileText
