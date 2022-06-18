import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

const CATEGORIES = [
  { id: '0', name: '선택하지 않음' },
  { id: '1', name: '상의' },
  { id: '2', name: '하의' },
  { id: '3', name: '원피스' },
  { id: '4', name: '아우터' },
  { id: '5', name: '신발' },
  { id: '6', name: '가방' },
  { id: '7', name: '모자' },
]

const ItemInfomation = ({
  category,
  price,
  buyingPlace,
  onCategoryChange,
  onPriceChange,
  onBuyingPlaceChange,
}) => {
  return (
    <div>
      <FormControl sx={{ width: 150 }}>
        <InputLabel>아이템 종류</InputLabel>
        <Select
          label="아이템 종류"
          value={category}
          onChange={e => onCategoryChange(e.target.value)}
        >
          {CATEGORIES.map(category => {
            const value = category.name === '선택하지 않음' ? '' : category.name

            return (
              <MenuItem key={category.id} value={value}>
                {category.name}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
      <TextField
        label="가격"
        type="number"
        value={price}
        onChange={e => onPriceChange(e.target.value)}
      />
      <TextField
        label="구입처"
        value={buyingPlace}
        onChange={e => onBuyingPlaceChange(e.target.value)}
      />
      <Button variant="contained">아이템 정보 더 추가</Button>
    </div>
  )
}

export default ItemInfomation
