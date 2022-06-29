import { useState } from 'react'
import withHeader from 'hocs/withHeader'
import FashionItemsList from 'components/closet/fashionItemsList'
import ButtonGroupsForFilteringFashionItems from 'components/closet/buttonGroupsForFilteringFashionItems'
import FashionItemCreatingArea from 'components/closet/fashionItemCreatingArea'
import useMe from 'hooks/useMe'
import useFashionItems from 'hooks/useFashionItems'
import createUrlQuery from 'utils/createUrlQuery'
import { BACKEND_URL } from 'constants/constants'

const ClosetPage = () => {
  const [season, setSeason] = useState('')
  const [category, setCategory] = useState('')
  const [color, setColor] = useState('')

  const handleSeasonChange = (event, season) => {
    setSeason(season)
  }

  const handleCategoryChange = (event, category) => {
    setCategory(category)
  }

  const handleColorChange = (event, color) => {
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

  let queryArrayForFilteringFashionItems = [season, category, color]
  queryArrayForFilteringFashionItems =
    queryArrayForFilteringFashionItems.filter(
      query => query !== null && query !== ''
    )

  const filter = (dataArray, queryArray) =>
    dataArray.filter(data => {
      const valuesOfData = Object.values(data)
      const isMatchWithQuery = queryArray.every(query =>
        valuesOfData.includes(query)
      )
      return isMatchWithQuery
    })

  const filteredFashionItems = filter(
    fashionItems,
    queryArrayForFilteringFashionItems
  )

  const fashionItemsToShowed =
    season === '' && category === '' && color === ''
      ? fashionItems
      : filteredFashionItems

  return (
    <>
      <ButtonGroupsForFilteringFashionItems
        season={season}
        category={category}
        color={color}
        onSeasonChange={handleSeasonChange}
        onCategoryChange={handleCategoryChange}
        onColorChange={handleColorChange}
      />
      <FashionItemsList fashionItems={fashionItemsToShowed} />
      <FashionItemCreatingArea />
    </>
  )
}

export default withHeader(ClosetPage)
