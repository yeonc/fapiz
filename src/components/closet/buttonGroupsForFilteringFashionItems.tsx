import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import {
  FASHION_ITEM_SEASONS,
  FASHION_ITEM_CATEGORIES,
  FASHION_ITEM_COLORS,
} from 'constants/fashionItem'

const StyledButtonGroupsForFilteringFashionItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonGroupsForFilteringFashionItems = ({
  fashionItemsToFiltered,
  afterFashionItemsFiltered,
}) => {
  const [season, setSeason] = useState('')
  const [category, setCategory] = useState('')
  const [color, setColor] = useState('')

  const handleSeasonChange = (season: any) => {
    setSeason(season)
  }

  const handleCategoryChange = (category: any) => {
    setCategory(category)
  }

  const handleColorChange = (color: any) => {
    setColor(color)
  }

  // TODO: 가독성 개선하기
  const filter = (dataArray: any, queryArray: any) =>
    dataArray.filter((data: any) => {
      const valuesOfData = Object.values(data)
      const isMatchWithQuery = queryArray.every((query: any) =>
        valuesOfData.includes(query)
      )
      return isMatchWithQuery
    })

  useEffect(() => {
    let queryArrayForFilteringFashionItems = [season, category, color]
    queryArrayForFilteringFashionItems =
      queryArrayForFilteringFashionItems.filter(
        query => query !== null && query !== ''
      )

    if (queryArrayForFilteringFashionItems === []) {
      afterFashionItemsFiltered([])
      return
    }

    const filteredFashionItems = filter(
      fashionItemsToFiltered,
      queryArrayForFilteringFashionItems
    )

    afterFashionItemsFiltered(filteredFashionItems)
  }, [season, category, color])

  return (
    <StyledButtonGroupsForFilteringFashionItemsWrapper>
      <ToggleButtonGroup
        value={season}
        exclusive
        onChange={(e, season) => handleSeasonChange(season)}
        aria-label="계절 선택"
      >
        {FASHION_ITEM_SEASONS.map(season => (
          <ToggleButton
            key={season.id}
            value={season.name}
            aria-label={season.name}
          >
            {season.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <ToggleButtonGroup
        value={category}
        exclusive
        onChange={(e, category) => handleCategoryChange(category)}
        aria-label="카테고리 선택"
      >
        {FASHION_ITEM_CATEGORIES.map(category => (
          <ToggleButton
            key={category.id}
            value={category.name}
            aria-label={category.name}
          >
            {category.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <ToggleButtonGroup
        value={color}
        exclusive
        onChange={(e, color) => handleColorChange(color)}
        aria-label="색상 선택"
      >
        {FASHION_ITEM_COLORS.map(color => (
          <ToggleButton
            key={color.id}
            value={color.name}
            aria-label={color.name}
          >
            {color.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </StyledButtonGroupsForFilteringFashionItemsWrapper>
  )
}

export default ButtonGroupsForFilteringFashionItems
