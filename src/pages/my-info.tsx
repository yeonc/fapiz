import withHeader from 'hocs/withHeader'
import withLoginPageRedirect from 'hocs/withLoginPageRedirect'
import styled from '@emotion/styled'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import MyInfoEditForm from 'components/myInfo/myInfoEditForm'
import Typo from 'components/common/typo'
import MaxWidthContainer from 'components/layouts/containers/maxWidthContainer'
import createUrlQuery from 'utils/createUrlQuery'
import { User, UserResponseWithProfileImage } from 'types/user'
import { mgBottom } from 'styles/layout'
import { FashionStyle } from 'types/fashion'
import { useAuth } from 'context/AuthContext'
import useUser from 'hooks/useUser'
import { useSWRConfig } from 'swr'

export type UserForMyInfo = Omit<
  User,
  'gender' | 'bodyShape' | 'fashionStyles'
> & {
  gender: string
  bodyShape: string
  fashionStyles: FashionStyle[]
  imageUrl?: string
}

const TOOLTIP_TEXT =
  '성별, 체형, 패션 스타일 정보 중 두 가지 이상을 입력하면 메인 페이지에서 나와 같은 정보를 가진 유저들이 올린 SNS 게시물만을 볼 수 있어요! 🙂'

const StyledMyInfoPageWrapper = styled.div`
  padding: 30px 20px;
`

const StyledButton = styled(Button)`
  padding: 8px 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

const query = createUrlQuery({
  'populate[0]': 'profileImage',
})

const MyInfoPage = () => {
  const { me } = useAuth()
  const { user: userFromStrapi } = useUser<UserResponseWithProfileImage>(
    me?.id,
    query
  )
  const { mutate } = useSWRConfig()

  if (!userFromStrapi) {
    return null
  }

  const refetch = () => mutate({ url: `/api/users/${me?.id}?${query}` })
  const afterMyInfoEdited = () => refetch()

  const myInfo = sanitizeUser(userFromStrapi)

  return (
    <MaxWidthContainer>
      <StyledMyInfoPageWrapper>
        <Typo variant="h4" component="h1" css={mgBottom(10)}>
          내 정보 수정
        </Typo>
        <Tooltip title={TOOLTIP_TEXT}>
          <StyledButton startIcon={<TipsAndUpdatesIcon />} css={mgBottom(30)}>
            Tip (마우스를 올려서 확인해 보세요)
          </StyledButton>
        </Tooltip>
        <MyInfoEditForm myInfo={myInfo} afterMyInfoEdited={afterMyInfoEdited} />
      </StyledMyInfoPageWrapper>
    </MaxWidthContainer>
  )
}

export default withHeader(withLoginPageRedirect(MyInfoPage))

const sanitizeUser = (user: UserResponseWithProfileImage): UserForMyInfo => ({
  id: user.id,
  imageUrl: user.profileImage?.url,
  username: user.username,
  gender: user.gender || '',
  height: user.height,
  weight: user.weight,
  bodyShape: user.bodyShape || '',
  fashionStyles: user.fashionStyles || [],
})
