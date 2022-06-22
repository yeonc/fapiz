import withHeader from 'hocs/withHeader'
import MyBasicInfo from 'components/userInfo/myBasicInfo'
import UserDetailInfo from 'components/userInfo/userDetailInfo'

const MyInfoPage = () => {
  return (
    <>
      <MyBasicInfo />
      {/* <UserDetailInfo /> */}
    </>
  )
}

export default withHeader(MyInfoPage)
