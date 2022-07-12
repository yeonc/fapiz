import MyBasicInfoShowArea from 'components/myInfo/myBasicInfoShowArea'
import MyBasicInfoEditArea from 'components/myInfo/myBasicInfoEditArea'
import useMe from 'hooks/useMe'
import { BACKEND_URL } from 'constants/constants'

const MyBasicInfo = () => {
  const { me, isLoading } = useMe()

  if (isLoading) {
    return <p>유저 정보를 불러오는 중입니다...</p>
  }

  const myBasicInfo = {
    id: me.id,
    imageUrl: me.profileImage.url ? BACKEND_URL + me.profileImage.url : null,
    username: me.username ?? null,
    height: me.height ?? null,
    weight: me.weight ?? null,
    points: me.points ?? null,
    level: me.level ?? null,
  }

  return (
    <>
      <MyBasicInfoShowArea myBasicInfo={myBasicInfo} />
      <MyBasicInfoEditArea myBasicInfo={myBasicInfo} />
    </>
  )
}

export default MyBasicInfo
