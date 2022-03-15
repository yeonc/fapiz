import Link from '@mui/material/Link'
import styled from '@emotion/styled'
import ROUTE_URL from '../../../constants/routeUrl'
import SearchIcon from '@mui/icons-material/Search'
import ChatIcon from '@mui/icons-material/ChatBubbleOutline'
import Button from '@mui/material/Button'

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

const Navbar = ({ isLogined }) => {
  const linkList = isLogined
    ? PAGE_LINK_LIST.concat({ href: ROUTE_URL.HOME, name: '로그아웃' })
    : PAGE_LINK_LIST.concat({ href: ROUTE_URL.LOGIN, name: '로그인' })

  return (
    <nav>
      <PageLinkList>
        {linkList.map(link => (
          <PageLink key={link.href}>
            {link.name === '로그아웃' ? (
              <Button
                variant="text"
                size="large"
                onClick={() => console.log(`로그아웃이 완료되었습니다.`)}
              >
                {link.name}
              </Button>
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
