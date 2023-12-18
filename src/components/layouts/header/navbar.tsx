import { useRouter } from 'next/router'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import styled from '@emotion/styled'
import ROUTE_URL from 'constants/routeUrl'
import { useAuth } from 'context/AuthContext'

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
`

const StyledPageLinkList = styled.ul`
  display: inline-flex;
`

const StyledPageLink = styled.li`
  margin-right: 24px;
`

const AuthButton = () => {
  const { me, logout } = useAuth()
  const router = useRouter()

  const goToLoginPage = () => router.push(ROUTE_URL.LOGIN)
  const goToHomePage = () => router.push(ROUTE_URL.HOME)

  const authButtonText = me ? '로그아웃' : '로그인'
  const handleClick = me
    ? async () => {
        await logout()
        goToHomePage()
      }
    : goToLoginPage

  return (
    <Button variant="contained" size="medium" onClick={handleClick}>
      {authButtonText}
    </Button>
  )
}

const Navbar = () => {
  const { me } = useAuth()

  const PAGE_LINK_LIST = [
    {
      href: me ? `${ROUTE_URL.SNS}/${me.id}` : ROUTE_URL.LOGIN,
      content: 'SNS',
    },
    { href: ROUTE_URL.CLOSET, content: '옷장' },
    { href: ROUTE_URL.SEARCH, content: '검색' },
    { href: ROUTE_URL.MY_INFO, content: '내정보' },
  ]

  return (
    <StyledNavbar>
      <StyledPageLinkList>
        {PAGE_LINK_LIST.map(link => (
          <StyledPageLink key={link.href}>
            <Link href={link.href}>{link.content}</Link>
          </StyledPageLink>
        ))}
      </StyledPageLinkList>
      <AuthButton />
    </StyledNavbar>
  )
}

export default Navbar
