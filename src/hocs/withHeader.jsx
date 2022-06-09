import Header from 'components/layouts/header'
import useFetchUser from 'hooks/useFetchUser'

const withHeader = Page => {
  return () => {
    const { user, error } = useFetchUser()

    if (error) {
      return <p>에러가 발생했습니다. 홈으로 돌아가세요</p>
    }

    return (
      <>
        <Header isLoggedIn={!!user} userId={user?.id} />
        <Page isLoggedIn={!!user} />
      </>
    )
  }
}

export default withHeader
