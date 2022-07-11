import styled from '@emotion/styled'
import FashionItemListItem from 'components/closet/fashionItemListItem'

const StyledFashionItemListWrapper = styled.div`
  max-width: 800px;
`

const StyledFashionItemList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`

const FashionItemList = ({ fashionItems }) => {
  return (
    <StyledFashionItemListWrapper>
      <StyledFashionItemList>
        {fashionItems.map((fashionItem: any) => (
          <FashionItemListItem key={fashionItem.id} fashionItem={fashionItem} />
        ))}
      </StyledFashionItemList>
    </StyledFashionItemListWrapper>
  )
}

export default FashionItemList
