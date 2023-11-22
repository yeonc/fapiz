import styled from '@emotion/styled'
import ImageList from '@mui/material/ImageList'
import AnnouncementIcon from '@mui/icons-material/Announcement'
import FashionItemListItem from 'components/closet/fashionItemListItem'
import Typo from 'components/common/typo'
import { mgBottom } from 'styles/layout'
import { FashionItemForCloset } from 'pages/closet'

const StyledNoExistFashionItem = styled.div`
  text-align: center;
  padding-top: 40px;
`

type FashonItemListProps = {
  fashionItems: FashionItemForCloset[]
}

const FashionItemList = ({ fashionItems }: FashonItemListProps) => {
  if (fashionItems.length === 0) {
    return (
      <StyledNoExistFashionItem>
        <AnnouncementIcon fontSize="large" css={mgBottom(6)} />
        <Typo>조건에 해당하는 아이템이 존재하지 않습니다.</Typo>
      </StyledNoExistFashionItem>
    )
  }

  return (
    <ImageList cols={5} rowHeight={250} gap={10}>
      {fashionItems.map(fashionItem => (
        <FashionItemListItem key={fashionItem.id} fashionItem={fashionItem} />
      ))}
    </ImageList>
  )
}

export default FashionItemList
