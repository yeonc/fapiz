import MyAdditionalInfoShowArea from 'components/myInfo/myAdditionalInfoShowArea'
import MyAdditionalInfoEditArea from 'components/myInfo/myAdditionalInfoEditArea'
import MyAdditionalInfoAddArea from 'components/myInfo/myAdditionalInfoAddArea'
import useMe from 'hooks/useMe'

const MyAdditionalInfo = () => {
  const { me } = useMe()

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
