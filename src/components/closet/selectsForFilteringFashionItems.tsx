import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

type SelectsForFilteringFashionItemsProps = {
  category: string
  categories: string[]
  handleCategoryChange: (category: string) => void
  color: string
  colors: string[]
  handleColorChange: (color: string) => void
}

const SelectsForFilteringFashionItems = ({
  category,
  categories,
  handleCategoryChange,
  color,
  colors,
  handleColorChange,
}: SelectsForFilteringFashionItemsProps) => {
  return (
    <>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>카테고리</InputLabel>
        <Select
          value={category}
          onChange={e => handleCategoryChange(e.target.value)}
          label="카테고리"
        >
          <MenuItem value="all">ALL</MenuItem>
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>색상</InputLabel>
        <Select
          value={color}
          onChange={e => handleColorChange(e.target.value)}
          label="색상"
        >
          <MenuItem value="all">ALL</MenuItem>
          {colors.map((color, index) => (
            <MenuItem key={index} value={color}>
              {color}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default SelectsForFilteringFashionItems
