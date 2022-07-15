import withHeader from 'hocs/withHeader'
import MyBasicInfo from 'components/myInfo/myBasicInfo'
import MyAdditionalInfo from 'components/myInfo/myAdditionalInfo'
import useMe from 'hooks/useMe'
import LoginPageRedirect from 'components/common/redirect/loginPageRedirect'

const MyInfoPage = () => {
  const { me, isLoading } = useMe()

  // TODO: 로그인 상태에서는 화면 잘 나오는데 로그아웃했을 땐 로딩중 문구 떠있는 문제 해결하기
  if (isLoading) {
    return <p>로딩중...</p>
  }

  return (
    <>
      {me ? (
        <>
          <MyBasicInfo />
          <MyAdditionalInfo />
        </>
      ) : (
        <LoginPageRedirect />
      )}
    </>
  )
}

export default withHeader(MyInfoPage)
