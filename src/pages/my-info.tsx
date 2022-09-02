import { useSWRConfig } from 'swr'
import withHeader from 'hocs/withHeader'
import withLoginPageRedirect from 'hocs/withLoginPageRedirect'
import styled from '@emotion/styled'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import InfoIcon from '@mui/icons-material/Info'
import MyInfoEditForm from 'components/myInfo/myInfoEditForm'
import Typo from 'components/common/typo'
import useMe from 'hooks/useMe'
import getToken from 'utils/getToken'
import { BACKEND_URL } from 'constants/constants'
import { UserForMyInfoPage } from 'types/user'
import { mgBottom } from 'styles/layout'
import PageContainer from 'components/layouts/containers/pageContainer'

const TOOLTIP_TEXT =
  '성별, 체형, 패션 스타일 정보 중 두 가지 이상을 입력하면 메인 페이지에서 나와 같은 정보를 가진 유저들이 올린 SNS 게시물만을 볼 수 있어요! 🙂'

const StyledMyInfoPageWrapper = styled.div`
  padding: 20px 20px 30px;
`

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
    <PageContainer>
      <StyledMyInfoPageWrapper>
        <Typo variant="h4" component="h1">
          내 정보 수정
        </Typo>
        <Tooltip title={TOOLTIP_TEXT}>
          <Button startIcon={<InfoIcon />} css={mgBottom(30)}>
            Tip (마우스를 올려서 확인해 보세요)
          </Button>
        </Tooltip>
        <MyInfoEditForm
          myInfo={myInfo}
          afterMyInfoEdited={afterMyInfoEdited}
          afterMyInfoEditCanceled={afterMyInfoEditCanceled}
        />
      </StyledMyInfoPageWrapper>
    </PageContainer>
  )
}

export default withHeader(withLoginPageRedirect(MyInfoPage))
