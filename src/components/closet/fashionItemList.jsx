import styled from '@emotion/styled'
import FashionItemListItem from './fashionItemListItem'

const StyledFashionItemListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
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
        {fashionItems.map(fashionItem => (
          <FashionItemListItem key={fashionItem.id} fashionItem={fashionItem} />
        ))}
      </StyledFashionItemList>
    </StyledFashionItemListWrapper>
  )
}

export default FashionItemList
