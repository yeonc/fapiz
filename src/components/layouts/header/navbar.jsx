import { useRouter } from 'next/router'
import Link from '@mui/material/Link'
import SearchIcon from '@mui/icons-material/Search'
import ChatIcon from '@mui/icons-material/ChatBubbleOutline'
import Button from '@mui/material/Button'
import styled from '@emotion/styled'
import ROUTE_URL from 'constants/routeUrl'
import useMe from 'hooks/useMe'

const StyledNavWrapper = styled.nav`
  display: flex;
  align-items: center;
`

const StyledPageLinkList = styled.ul`
  display: flex;
  align-items: center;
`

const StyledPageLink = styled.li`
  margin-right: 20px;
`

const AuthButton = () => {
  const router = useRouter()

  const { me } = useMe()

  const goToLoginPage = () => router.push(ROUTE_URL.LOGIN)

  const logout = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('username')
  }

  const text = me ? '로그아웃' : '로그인'
  const handleClick = me
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

const Navbar = () => {
  const { me } = useMe()

  const PAGE_LINK_LIST = [
    {
      href: me ? `${ROUTE_URL.SNS}/${me.id}` : ROUTE_URL.LOGIN,
      content: 'SNS',
    },
    { href: ROUTE_URL.COMMUNITY, content: '커뮤니티' },
    { href: ROUTE_URL.CLOSET, content: '마이페이지' },
    { href: ROUTE_URL.SEARCH, content: searchIcon },
    { href: ROUTE_URL.CHAT_LIST, content: chatIcon },
    { href: ROUTE_URL.MY_INFO, content: '내정보' },
  ]

  return (
    <StyledNavWrapper>
      <StyledPageLinkList>
        {PAGE_LINK_LIST.map(link => (
          <StyledPageLink key={link.href}>
            <Link href={link.href}>{link.content}</Link>
          </StyledPageLink>
        ))}
      </StyledPageLinkList>
      <AuthButton />
    </StyledNavWrapper>
  )
}

export default Navbar
