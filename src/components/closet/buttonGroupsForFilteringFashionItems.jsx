import { useState } from 'react'
import styled from '@emotion/styled'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import { SEASONS, CATEGORIES, COLORS } from 'constants/fashionItemFeatures'

const ButtonGroupsForFilteringFashionItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonGroupsForFilteringFashionItems = () => {
  const [season, setSeason] = useState(null)
  const [categories, setCategories] = useState(null)
  const [colors, setColors] = useState(null)

  const handleSeasonChange = (event, season) => {
    setSeason(season)
  }

  const handleCategoriesChange = (event, categories) => {
    setCategories(categories)
  }

  const handleColorsChange = (event, colors) => {
    setColors(colors)
  }

  return (
    <ButtonGroupsForFilteringFashionItemsWrapper>
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
        value={categories}
        onChange={handleCategoriesChange}
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
        value={colors}
        onChange={handleColorsChange}
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
    </ButtonGroupsForFilteringFashionItemsWrapper>
  )
}

export default ButtonGroupsForFilteringFashionItems
