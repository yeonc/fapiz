import withHeader from 'hocs/withHeader'
import UserBasicInfo from 'components/userInfo/userBasicInfo'
import UserDetailInfo from 'components/userInfo/userDetailInfo'
import useMe from 'hooks/useMe'
import { BACKEND_URL } from 'constants/constants'

const MyInfoPage = () => {
  const { me, isLoading } = useMe()

  if (isLoading) {
    return <p>유저 정보를 불러오는 중입니다...</p>
  }

  const NOT_INFOMATION_TEXT =
    '정보가 없습니다. 상세 정보 수정 버튼을 눌러 정보를 입력해 보세요!'

  const basicInfo = {
    userImageUrl: me.profileImage.url
      ? BACKEND_URL + me.profileImage.url
      : NOT_INFOMATION_TEXT,
    username: me.username ? me.username : NOT_INFOMATION_TEXT,
    height: me.height ? me.weight : NOT_INFOMATION_TEXT,
    weight: me.weight ? me.weight : NOT_INFOMATION_TEXT,
    points: me.points ? me.points : NOT_INFOMATION_TEXT,
    level: me.level ? me.level : NOT_INFOMATION_TEXT,
  }

  return (
    <>
      <UserBasicInfo data={basicInfo} />
      <UserDetailInfo />
    </>
  )
}

export default withHeader(MyInfoPage)
