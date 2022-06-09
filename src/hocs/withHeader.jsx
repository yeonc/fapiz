import Header from 'components/layouts/header'
import useMe from 'hooks/useMe'

const withHeader = Page => {
  return () => {
    const { me, isError } = useMe()

    // if (loading) {
    //   return <p>로딩중...</p>
    // }

    if (isError) {
      return <p>에러가 발생했습니다. 홈으로 돌아가세요</p>
    }

    return (
      <>
        <Header isLoggedIn={!!me} myId={me?.id} />
        <Page isLoggedIn={!!me} me={me} />
      </>
    )
  }
}

export default withHeader
