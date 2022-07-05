import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

const NOT_INFOMATION_TEXT =
  '정보가 없습니다. 상세 정보 수정 버튼을 눌러 정보를 입력해 보세요!'

const MyBasicInfoShowArea = ({ myBasicInfo }) => (
  <>
    <Avatar
      alt={myBasicInfo.username}
      src={myBasicInfo.imageUrl}
      sx={{ width: 100, height: 100 }}
    />
    <Typography variant="h4" component="h1">
      {myBasicInfo.username}
    </Typography>
    <dl>
      <div>
        <dt>포인트</dt>
        <dd>{myBasicInfo.points}</dd>
      </div>
      <div>
        <dt>레벨</dt>
        <dd>{myBasicInfo.level}</dd>
      </div>
    </dl>
    <dl>
      <div>
        <dt>키</dt>
        <dd>
          {myBasicInfo.height ? `${myBasicInfo.height}cm` : NOT_INFOMATION_TEXT}
        </dd>
      </div>
      <div>
        <dt>몸무게</dt>
        <dd>
          {myBasicInfo.weight ? `${myBasicInfo.weight}kg` : NOT_INFOMATION_TEXT}
        </dd>
      </div>
    </dl>
  </>
)

export default MyBasicInfoShowArea
