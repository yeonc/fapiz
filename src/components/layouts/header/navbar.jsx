import { useEffect, useState } from 'react'
import Link from '@mui/material/Link'
import styled from '@emotion/styled'
import ROUTE_URL from '../../../constants/routeUrl'
import SearchIcon from '@mui/icons-material/Search'
import ChatIcon from '@mui/icons-material/ChatBubbleOutline'
import LogoutButton from '@mui/material/Button'

const searchIcon = <SearchIcon />
const chatIcon = <ChatIcon />

const PAGE_LINK_LIST = [
  { href: ROUTE_URL.SNS, name: 'SNS' },
  { href: ROUTE_URL.COMMUNITY, name: '커뮤니티' },
  { href: ROUTE_URL.CLOSET, name: '마이페이지' },
  { href: ROUTE_URL.SEARCH, name: searchIcon },
  { href: ROUTE_URL.CHAT_LIST, name: chatIcon },
  { href: ROUTE_URL.MY_INFO, name: '내정보' },
]

const PageLinkList = styled.ul`
  display: flex;
  align-items: center;
`

const PageLink = styled.li`
  margin-right: 20px;
`

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState()

  useEffect(() => {
    const loginState = !!localStorage.getItem('jwt')
    setIsLoggedIn(loginState)
  }, [])

  const linkList = isLoggedIn
    ? PAGE_LINK_LIST.concat({ href: ROUTE_URL.HOME, name: '로그아웃' })
    : PAGE_LINK_LIST.concat({ href: ROUTE_URL.LOGIN, name: '로그인' })

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('username')
    setIsLoggedIn(false)
  }

  return (
    <nav>
      <PageLinkList>
        {linkList.map(link => (
          <PageLink key={link.href}>
            {link.name === '로그아웃' ? (
              <LogoutButton variant="text" size="large" onClick={handleLogout}>
                {link.name}
              </LogoutButton>
            ) : (
              <Link href={link.href}>{link.name}</Link>
            )}
          </PageLink>
        ))}
      </PageLinkList>
    </nav>
  )
}

export default Navbar
