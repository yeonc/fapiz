import { useSWRConfig } from 'swr'
import withHeader from 'hocs/withHeader'
import withLoginPageRedirect from 'hocs/withLoginPageRedirect'
import MyInfoEditForm from 'components/myInfo/myInfoEditForm'
import useMe from 'hooks/useMe'
import getToken from 'utils/getToken'
import { BACKEND_URL } from 'constants/constants'
import { UserForMyInfoPage } from 'types/user'

const MyInfoPage = () => {
  const { me } = useMe()

  const myInfo: UserForMyInfoPage = {
    id: me.id,
    imageUrl: me.profileImage?.url,
    username: me?.username,
    gender: me.gender || null,
    height: me.height ?? null,
    weight: me.weight ?? null,
    bodyShape: me.bodyShape || null,
    fashionStyles: me.fashionStyles || [],
  }

  const { mutate } = useSWRConfig()

  const refetch = () => {
    const token = getToken()
    if (!token) return

    mutate({
      url: `${BACKEND_URL}/api/users/me`,
      config: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })
  }

  const afterMyInfoEdited = () => {
    alert('정보가 수정되었습니다!')
  }

  const afterMyInfoEditCanceled = () => {
    alert('정보 수정이 취소되었습니다!')
    refetch()
  }

  return (
    <MyInfoEditForm
      myInfo={myInfo}
      afterMyInfoEdited={afterMyInfoEdited}
      afterMyInfoEditCanceled={afterMyInfoEditCanceled}
    />
  )
}

export default withHeader(withLoginPageRedirect(MyInfoPage))
