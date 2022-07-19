import MyBasicInfoShowArea from 'components/myInfo/myBasicInfoShowArea'
import MyBasicInfoEditArea from 'components/myInfo/myBasicInfoEditArea'
import useMe from 'hooks/useMe'
import addBackendUrlToImageUrl from 'utils/addBackendUrlToImageUrl'

const MyBasicInfo = () => {
  const { me } = useMe()

  const myBasicInfo = {
    id: me.id,
    imageUrl: addBackendUrlToImageUrl(me.profileImage?.url),
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
