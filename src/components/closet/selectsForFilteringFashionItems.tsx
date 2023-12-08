import { css } from '@emotion/react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { mgRight } from 'styles/layout'
import styled from '@emotion/styled'
import { ALL_TEXT } from 'constants/common'

type SelectsForFilteringFashionItemsProps = {
  category: string
  categories: string[]
  handleCategoryChange: (category: string) => void
  color: string
  colors: string[]
  handleColorChange: (color: string) => void
  className?: string
}

export const CATEGORY_TEXT = '카테고리'
export const COLOR_TEXT = '색상'

const StyledAllText = styled.span`
  text-transform: uppercase;
`

const formControlMinWidth = css`
  min-width: 120px;
`

const SelectsForFilteringFashionItems = ({
  category,
  categories,
  handleCategoryChange,
  color,
  colors,
  handleColorChange,
  className,
}: SelectsForFilteringFashionItemsProps) => {
  return (
    <div className={className}>
      <FormControl css={[formControlMinWidth, mgRight(10)]}>
        <InputLabel>{CATEGORY_TEXT}</InputLabel>
        <Select
          value={category}
          onChange={e => handleCategoryChange(e.target.value)}
          label={CATEGORY_TEXT}
        >
          <MenuItem value={ALL_TEXT}>
            <StyledAllText>{ALL_TEXT}</StyledAllText>
          </MenuItem>
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl css={formControlMinWidth}>
        <InputLabel>{COLOR_TEXT}</InputLabel>
        <Select
          value={color}
          onChange={e => handleColorChange(e.target.value)}
          label={COLOR_TEXT}
        >
          <MenuItem value={ALL_TEXT}>
            <StyledAllText>{ALL_TEXT}</StyledAllText>
          </MenuItem>
          {colors.map((color, index) => (
            <MenuItem key={index} value={color}>
              {color}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default SelectsForFilteringFashionItems
