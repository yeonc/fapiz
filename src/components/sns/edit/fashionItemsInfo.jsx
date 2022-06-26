import IconButton from '@mui/material/IconButton'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
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

const FASHION_ITEM_INFO_TYPE = {
  category: 'category',
  price: 'price',
  buyingPlace: 'buyingPlace',
}

const FashionItemsInfo = ({
  fashionItemsInfo,
  onFashionItemsInfoChange,
  onFashionItemInfoAddMoreButtonClick,
  onFashionItemInfoDeleteButtonClick,
}) => (
  <>
    <ul>
      {fashionItemsInfo.map((fashionItemInfo, fashionItemInfoIndex) => {
        const changeFashionItemsInfo = fashionItemInfoToChange => {
          const changedFashionItemInfo = {
            ...fashionItemInfo,
            [fashionItemInfoToChange.key]: fashionItemInfoToChange.value,
          }

          fashionItemsInfo.splice(
            fashionItemInfoIndex,
            1,
            changedFashionItemInfo
          )

          const changedFashionItemsInfo = [...fashionItemsInfo]
          return changedFashionItemsInfo
        }

        const handleFashionItemInfoInputChange = fashionItemInfoType => e => {
          const fashionItemInfoToChange = {
            key: fashionItemInfoType,
            value: e.target.value,
          }

          onFashionItemsInfoChange(
            changeFashionItemsInfo(fashionItemInfoToChange)
          )
        }

        return (
          <li key={fashionItemInfo.id}>
            <FormControl sx={{ width: 150 }}>
              <InputLabel>아이템 종류</InputLabel>
              <Select
                label="아이템 종류"
                value={fashionItemInfo.category}
                onChange={handleFashionItemInfoInputChange(
                  FASHION_ITEM_INFO_TYPE.category
                )}
              >
                {CATEGORIES.map(category => {
                  const value =
                    category.name === '선택하지 않음' ? '' : category.name

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
              value={fashionItemInfo.price}
              onChange={handleFashionItemInfoInputChange(
                FASHION_ITEM_INFO_TYPE.price
              )}
            />
            <TextField
              label="구입처"
              value={fashionItemInfo.buyingPlace}
              onChange={handleFashionItemInfoInputChange(
                FASHION_ITEM_INFO_TYPE.buyingPlace
              )}
            />
            <IconButton
              color="primary"
              onClick={() =>
                onFashionItemInfoDeleteButtonClick(fashionItemInfo.id)
              }
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          </li>
        )
      })}
    </ul>
    <Button variant="contained" onClick={onFashionItemInfoAddMoreButtonClick}>
      아이템 정보 더 추가
    </Button>
  </>
)

export default FashionItemsInfo
