import styled from '@emotion/styled'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import { SEASONS, CATEGORIES, COLORS } from 'constants/fashionItemFeatures'

const ButtonGroupsForFilteringFashionItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonGroupsForFilteringFashionItems = ({
  season,
  category,
  color,
  onSeasonChange,
  onCategoryChange,
  onColorChange,
}) => {
  return (
    <ButtonGroupsForFilteringFashionItemsWrapper>
      <ToggleButtonGroup
        value={season}
        exclusive
        onChange={onSeasonChange}
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
        onChange={onCategoryChange}
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
        onChange={onColorChange}
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
