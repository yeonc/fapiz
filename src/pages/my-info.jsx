import withHeader from 'hocs/withHeader'
import UserBasicInfo from 'components/userInfo/userBasicInfo'
import UserDetailInfo from 'components/userInfo/userDetailInfo'

const MyInfoPage = () => {
  return (
    <>
      <UserBasicInfo />
      <UserDetailInfo />
    </>
  )
}

export default withHeader(MyInfoPage)
