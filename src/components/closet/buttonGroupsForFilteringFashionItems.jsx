import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import { SEASONS, CATEGORIES, COLORS } from 'constants/fashionItemFeatures'

const StyledButtonGroupsForFilteringFashionItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonGroupsForFilteringFashionItems = ({
  fashionItemsToFiltered,
  afterFashionItemsFilter,
}) => {
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

  const filter = (dataArray, queryArray) =>
    dataArray.filter(data => {
      const valuesOfData = Object.values(data)
      const isMatchWithQuery = queryArray.every(query =>
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
      afterFashionItemsFilter([])
      return
    }

    const filteredFashionItems = filter(
      fashionItemsToFiltered,
      queryArrayForFilteringFashionItems
    )

    afterFashionItemsFilter(filteredFashionItems)
  }, [season, category, color])

  return (
    <StyledButtonGroupsForFilteringFashionItemsWrapper>
      <ToggleButtonGroup
        value={season}
        exclusive
        onChange={handleSeasonChange}
        aria-label="계절 선택"
      >
        {SEASONS.map(season => (
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
        onChange={handleCategoryChange}
        aria-label="카테고리 선택"
      >
        {CATEGORIES.map(category => (
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
        onChange={handleColorChange}
        aria-label="색상 선택"
      >
        {COLORS.map(color => (
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
