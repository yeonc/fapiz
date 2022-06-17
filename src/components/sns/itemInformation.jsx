import { useState } from 'react'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

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
          onChange={onCategoryChange}
        >
          <MenuItem value="">선택하지 않음</MenuItem>
          <MenuItem value="상의">상의</MenuItem>
          <MenuItem value="하의">하의</MenuItem>
          <MenuItem value="원피스">원피스</MenuItem>
          <MenuItem value="아우터">아우터</MenuItem>
          <MenuItem value="신발">신발</MenuItem>
          <MenuItem value="가방">가방</MenuItem>
          <MenuItem value="모자">모자</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="가격"
        type="number"
        value={price}
        onChange={onPriceChange}
      />
      <TextField
        label="구입처"
        value={buyingPlace}
        onChange={onBuyingPlaceChange}
      />
      <Button variant="contained">아이템 정보 더 추가</Button>
    </div>
  )
}

export default ItemInfomation
