import Head from 'next/head'
import withHeader from 'hocs/withHeader'
import withLoginPageRedirect from 'hocs/withLoginPageRedirect'
import styled from '@emotion/styled'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import MyInfoEditForm from 'components/myInfo/myInfoEditForm'
import Typo from 'components/common/typo'
import MaxWidthContainer from 'components/layouts/containers/maxWidthContainer'
import createUrlQuery from 'utils/createUrlQuery'
import {
  BodyShape,
  Gender,
  User,
  UserResponseWithProfileImage,
} from 'types/user'
import { mgBottom } from 'styles/layout'
import { FashionStyle } from 'types/fashion'
import { useAuth } from 'context/AuthContext'
import useUser from 'hooks/useUser'
import { useSWRConfig } from 'swr'
import { sanitizeUserForMyInfo } from 'sanitizer/users'

export type UserForMyInfo = Omit<
  User,
  'gender' | 'bodyShape' | 'fashionStyles'
> & {
  gender: Gender | ''
  bodyShape: BodyShape | ''
  fashionStyles: FashionStyle[]
  imageUrl?: string
}

const TOOLTIP_TEXT =
  '성별, 체형, 패션 스타일 정보 중 두 가지 이상을 입력하면 메인 페이지에서 나와 같은 정보를 가진 유저들이 올린 SNS 게시물만을 볼 수 있어요! 🙂'

const BOX_BOX_SHADOW = 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'

const StyledMyInfoPageWrapper = styled.div`
  padding: 30px 20px;
`

const StyledBox = styled(Box)`
  display: inline-block;
  padding: 8px 20px;
  border-radius: 12px;
  box-shadow: ${BOX_BOX_SHADOW};
  font-size: 16px;
  cursor: default;
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

  const myInfo = sanitizeUserForMyInfo(userFromStrapi)

  return (
    <>
      <Head>
        <title>내 정보 | Fapiz</title>
        <meta name="description" content="내 정보를 수정해 보세요" />
      </Head>
      <MaxWidthContainer>
        <StyledMyInfoPageWrapper>
          <Typo variant="h4" component="h1" css={mgBottom(16)}>
            내 정보 수정
          </Typo>
          <Tooltip title={TOOLTIP_TEXT}>
            <StyledBox css={mgBottom(30)}>
              💡 Tip (마우스를 올려서 확인해 보세요)
            </StyledBox>
          </Tooltip>
          <MyInfoEditForm
            myInfo={myInfo}
            afterMyInfoEdited={afterMyInfoEdited}
          />
        </StyledMyInfoPageWrapper>
      </MaxWidthContainer>
    </>
  )
}

export default withHeader(withLoginPageRedirect(MyInfoPage))
