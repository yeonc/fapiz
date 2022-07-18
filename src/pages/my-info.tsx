import withHeader from 'hocs/withHeader'
import withLoginPageRedirect from 'hocs/withLoginPageRedirect'
import MyBasicInfo from 'components/myInfo/myBasicInfo'
import MyAdditionalInfo from 'components/myInfo/myAdditionalInfo'

const MyInfoPage = () => {
  return (
    <>
      <MyBasicInfo />
      <MyAdditionalInfo />
    </>
  )
}

export default withHeader(withLoginPageRedirect(MyInfoPage))
