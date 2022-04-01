import withHeader from 'components/layouts/header'
import UserInfo from 'components/sns/userInfo'
import SnsPosts from 'components/sns/snsPosts'

const SnsPage = () => {
  return (
    <>
      <UserInfo />
      <SnsPosts />
    </>
  )
}

export default withHeader(SnsPage)
