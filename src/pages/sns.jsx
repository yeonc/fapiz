import withHeader from 'components/layouts/Header'
import UserInfo from 'components/SNSPage/userInfo'
import SNSPosts from 'components/SNSPage/SNSPosts'

const SNSPage = () => {
  return (
    <>
      <UserInfo />
      <SNSPosts />
    </>
  )
}

export default withHeader(SNSPage)
