import { css } from '@emotion/react'
import styled from '@emotion/styled'
import FashionItemEditingArea from 'components/closet/fashionItemEditingArea'

const FashionItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
`

const fashionItemListStyle = css`
  display: flex;
  flex-wrap: wrap;
`

const fashionItemListItemStyle = css`
  position: relative;
`

const fashionItemImageStyle = css`
  width: 250px;
  height: 250px;
  border-radius: 5px;
  object-fit: cover;
`

const FashionItemsList = ({ fashionItems }) => (
  <FashionItemsWrapper>
    <ul css={fashionItemListStyle}>
      {fashionItems.map(fashionItem => (
        <li key={fashionItem.id} css={fashionItemListItemStyle}>
          <img
            src={fashionItem.image.url}
            alt={fashionItem.image.altText}
            css={fashionItemImageStyle}
          />
          <FashionItemEditingArea initialFashionItem={fashionItem} />
        </li>
      ))}
    </ul>
  </FashionItemsWrapper>
)

export default FashionItemsList
