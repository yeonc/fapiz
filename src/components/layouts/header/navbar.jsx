import { useRouter } from 'next/router'
import Link from '@mui/material/Link'
import SearchIcon from '@mui/icons-material/Search'
import ChatIcon from '@mui/icons-material/ChatBubbleOutline'
import Button from '@mui/material/Button'
import styled from '@emotion/styled'
import ROUTE_URL from 'constants/routeUrl'

const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
`

const PageLinkList = styled.ul`
  display: flex;
  align-items: center;
`

const PageLink = styled.li`
  margin-right: 20px;
`

const AuthButton = ({ isLoggedIn }) => {
  const router = useRouter()

  const goToLoginPage = () => router.push(ROUTE_URL.LOGIN)

  const logout = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('username')
  }

  const text = isLoggedIn ? '로그아웃' : '로그인'
  const handleClick = isLoggedIn
    ? () => {
        logout()
        router.push(ROUTE_URL.HOME)
      }
    : goToLoginPage

  return (
    <Button variant="contained" size="medium" onClick={handleClick}>
      {text}
    </Button>
  )
}

const searchIcon = <SearchIcon />
const chatIcon = <ChatIcon />

const Navbar = ({ isLoggedIn, myId }) => {
  const PAGE_LINK_LIST = [
    { href: ROUTE_URL.SNS + '/' + myId, content: 'SNS' },
    { href: ROUTE_URL.COMMUNITY, content: '커뮤니티' },
    { href: ROUTE_URL.CLOSET, content: '마이페이지' },
    { href: ROUTE_URL.SEARCH, content: searchIcon },
    { href: ROUTE_URL.CHAT_LIST, content: chatIcon },
    { href: ROUTE_URL.MY_INFO, content: '내정보' },
  ]

  return (
    <NavWrapper>
      <PageLinkList>
        {PAGE_LINK_LIST.map(link => (
          <PageLink key={link.href}>
            <Link href={link.href}>{link.content}</Link>
          </PageLink>
        ))}
      </PageLinkList>
      <AuthButton isLoggedIn={isLoggedIn} />
    </NavWrapper>
  )
}

export default Navbar
