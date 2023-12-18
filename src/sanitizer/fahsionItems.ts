import { FashionItemForCloset } from 'pages/closet'
import { FashionItemResponse } from 'types/fashion'

export const sanitizeFashionItemsForCloset = (
  fashionItems: FashionItemResponse[]
): FashionItemForCloset[] =>
  fashionItems.map(fashionItem => ({
    id: fashionItem.id,
    category: fashionItem.attributes.category,
    color: fashionItem.attributes.color,
    image: {
      url: fashionItem.attributes.image.data.attributes.url,
      altText: fashionItem.attributes.image.data.attributes.alternativeText,
    },
  }))
