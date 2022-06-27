import { css } from '@emotion/react'
import styled from '@emotion/styled'
import useFashionItems from 'hooks/useFashionItems'
import createUrlQuery from 'utils/createUrlQuery'
import { BACKEND_URL } from 'constants/constants'
import FashionItemEditingArea from './fashionItemEditingArea'

const query = createUrlQuery({
  'populate[0]': 'image',
  'populate[1]': 'owner',
})

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

const FashionItemsList = () => {
  const { fashionItems: fashionItemsFromStrapi } = useFashionItems(query)

  const fashionItems = fashionItemsFromStrapi.map(fashionItem => ({
    id: fashionItem.id,
    season: fashionItem.attributes.season,
    category: fashionItem.attributes.category,
    color: fashionItem.attributes.color,
    image: {
      url: BACKEND_URL + fashionItem.attributes.image.data.attributes.url,
      altText: fashionItem.attributes.image.data.attributes.alternativeText,
    },
  }))

  return (
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
}

export default FashionItemsList
