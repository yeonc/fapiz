import withHeader from 'hocs/withHeader'
import UserBasicInfo from 'components/userInfo/userBasicInfo'
import UserDetailInfo from 'components/userInfo/userDetailInfo'
import useMe from 'hooks/useMe'
import { BACKEND_URL } from 'constants/constants'

const MyInfoPage = () => {
  const { me, isLoading, error } = useMe()

  if (isLoading) {
    return <p>유저 정보를 불러오는 중입니다...</p>
  }

  const basicInfo = {
    userImageUrl: BACKEND_URL + me.profileImage.url,
    username: me.username,
    height: me.height,
    weight: me.weight,
    points: me.points,
    level: me.level,
  }

  const detailInfo = {
    gender: me.gender,
    fashionStyles: me.fashionStyle,
    bodyShape: me.bodyShape,
  }

  return (
    <>
      <UserBasicInfo data={basicInfo} />
      <UserDetailInfo data={detailInfo} />
    </>
  )
}

export default withHeader(MyInfoPage)
