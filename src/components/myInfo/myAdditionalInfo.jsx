import MyAdditionalInfoShowArea from 'components/myInfo/myAdditionalInfoShowArea'
import MyAdditionalInfoEditArea from 'components/myInfo/myAdditionalInfoEditArea'
import MyAdditionalInfoAddArea from 'components/myInfo/myAdditionalInfoAddArea'
import useMe from 'hooks/useMe'

const MyAdditionalInfo = () => {
  const { me, isLoading } = useMe()

  if (isLoading) {
    return <p>내 추가 정보 불러오는 중...</p>
  }

  const myAdditionalInfo = {
    id: me.id,
    gender: me.gender || null,
    fashionStyles: me.fashionStyles || [],
    bodyShape: me.bodyShape || null,
  }

  const isExistMyAdditionalInfo = me.gender || me.fashionStyle || me.bodyShape

  return (
    <>
      {isExistMyAdditionalInfo ? (
        <>
          <MyAdditionalInfoShowArea myAdditionalInfo={myAdditionalInfo} />
          <MyAdditionalInfoEditArea myAdditionalInfo={myAdditionalInfo} />
        </>
      ) : (
        <MyAdditionalInfoAddArea myId={me.id} />
      )}
    </>
  )
}

export default MyAdditionalInfo
