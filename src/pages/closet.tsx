import { useState } from 'react'
import withHeader from 'hocs/withHeader'
import withLoginPageRedirect from 'hocs/withLoginPageRedirect'
import { css } from '@emotion/react'
import Fab from '@mui/material/Fab'
import CheckroomIcon from '@mui/icons-material/Checkroom'
import FashionItemList from 'components/closet/fashionItemList'
import SelectsForFilteringFashionItems from 'components/closet/selectsForFilteringFashionItems'
import FashionItemCreatingModal from 'components/closet/fashionItemCreatingModal'
import useMe from 'hooks/useMe'
import useFashionItems from 'hooks/useFashionItems'
import useModalState from 'hooks/useModalState'
import createUrlQuery from 'utils/createUrlQuery'
import removeDuplicatedValueFromArray from 'utils/removeDuplicatedValueFromArray'
import { FashionItemForClosetPage } from 'types/fashion'

const fabPositionFixed = css`
  position: fixed;
  right: 20px;
  bottom: 20px;
`

const ClosetPage = () => {
  const [category, setCategory] = useState('all')
  const [color, setColor] = useState('all')

  const handleCategoryChange = (category: string) => {
    setCategory(category)
  }

  const handleColorChange = (color: string) => {
    setColor(color)
  }

  const { me } = useMe()

  const query = createUrlQuery({
    'populate[0]': 'image',
    'populate[1]': 'owner',
    'filters[owner][id][$eq]': me && me.id,
    sort: 'createdAt:desc',
  })

  const { fashionItems: fashionItemsFromStrapi } = useFashionItems(query)

  const fashionItems: FashionItemForClosetPage[] = fashionItemsFromStrapi.map(
    (fashionItem: any) => ({
      id: fashionItem.id,
      category: fashionItem.attributes.category,
      color: fashionItem.attributes.color,
      image: {
        url: fashionItem.attributes.image.data.attributes.url,
        altText: fashionItem.attributes.image.data.attributes.alternativeText,
      },
    })
  )

  const {
    isOpen: isFashionItemCreateModalOpen,
    handleOpen: handleFashionItemCreateModalOpen,
    handleClose: handleFashionItemCreateModalClose,
  } = useModalState()

  const categories = getCategoriesFromFashionItems(fashionItems)
  const colors = getColorsFromFashionItems(fashionItems)

  const filteredFashionItems = filterFashionItems({
    category,
    color,
    fashionItems,
  })

  return (
    <>
      <SelectsForFilteringFashionItems
        category={category}
        categories={categories}
        handleCategoryChange={handleCategoryChange}
        color={color}
        colors={colors}
        handleColorChange={handleColorChange}
      />
      <FashionItemList fashionItems={filteredFashionItems} />
      <Fab
        color="primary"
        aria-label="옷장에 패션 아이템 등록"
        css={fabPositionFixed}
        onClick={handleFashionItemCreateModalOpen}
      >
        <CheckroomIcon />
      </Fab>
      <FashionItemCreatingModal
        isFashionItemCreateModalOpen={isFashionItemCreateModalOpen}
        onFashionItemCreateModalClose={handleFashionItemCreateModalClose}
      />
    </>
  )
}

export default withHeader(withLoginPageRedirect(ClosetPage))

type Category = string
type Color = string

const getCategoriesFromFashionItems = (
  fashionItems: FashionItemForClosetPage[]
): Category[] => {
  const categories = fashionItems.map(fashionItem => fashionItem.category)
  return removeDuplicatedValueFromArray(categories)
}

const getColorsFromFashionItems = (
  fashionItems: FashionItemForClosetPage[]
): Color[] => {
  const colors = fashionItems.map(fashionItem => fashionItem.color)
  return removeDuplicatedValueFromArray(colors)
}

type FilterFashionItemsArgs = {
  category: string
  color: string
  fashionItems: FashionItemForClosetPage[]
}

type FilterFashionItems = (
  args: FilterFashionItemsArgs
) => FashionItemForClosetPage[]

const filterFashionItems: FilterFashionItems = ({
  category,
  color,
  fashionItems,
}) => {
  const filteredFashionItems = fashionItems
    .filter(byCategory(category))
    .filter(byColor(color))

  return filteredFashionItems
}

const byCategory =
  (category: string) =>
  (fashionItem: FashionItemForClosetPage): boolean => {
    if (category === 'all') {
      return true
    }

    return fashionItem.category === category
  }

const byColor =
  (color: string) =>
  (fashionItem: FashionItemForClosetPage): boolean => {
    if (color === 'all') {
      return true
    }

    return fashionItem.color === color
  }
