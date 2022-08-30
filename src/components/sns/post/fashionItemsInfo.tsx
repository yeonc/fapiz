import IconButton from '@mui/material/IconButton'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { FASHION_ITEM_CATEGORIES } from 'constants/fashionItem'
import { FashionItemInfo } from 'types/fashion'

type FashionItemInfoToChange = Partial<FashionItemInfo>

type ChangeFashionItemsInfoArgs = {
  fashionItemInfoId: number
  fashionItemInfoToChange: FashionItemInfoToChange
}

type ChangedFashionItemsInfo = FashionItemInfo[]

type ChangeFashionItemsInfo = (
  args: ChangeFashionItemsInfoArgs
) => ChangedFashionItemsInfo

type HandleCategoryChangeArgs = {
  fashionItemInfoId: number
  category: string
}

type handlePriceChangeArgs = {
  fashionItemInfoId: number
  price: number
}

type HandleBuyingPlaceChangeArgs = {
  fashionItemInfoId: number
  buyingPlace: string
}

type FashionItemsInfoProps = {
  fashionItemsInfo: FashionItemInfo[]
  onFashionItemsInfoChange: (fashionItemsInfo: FashionItemInfo[]) => void
  onFashionItemInfoDeleteButtonClick: (
    fashionItemInfoIdToDelete: number
  ) => void
}

const FashionItemsInfo = ({
  fashionItemsInfo,
  onFashionItemsInfoChange,
  onFashionItemInfoDeleteButtonClick,
}: FashionItemsInfoProps) => {
  const changeFashionItemsInfo: ChangeFashionItemsInfo = ({
    fashionItemInfoId,
    fashionItemInfoToChange,
  }) => {
    const changedFashionItemsInfo = fashionItemsInfo.map(fashionItemInfo => {
      if (fashionItemInfo.id === fashionItemInfoId) {
        return {
          ...fashionItemInfo,
          ...fashionItemInfoToChange,
        }
      }
      return fashionItemInfo
    })
    return changedFashionItemsInfo
  }

  const handleCategoryChange = ({
    fashionItemInfoId,
    category,
  }: HandleCategoryChangeArgs) => {
    const changedFashionItemsInfo = changeFashionItemsInfo({
      fashionItemInfoId,
      fashionItemInfoToChange: { category },
    })
    onFashionItemsInfoChange(changedFashionItemsInfo)
  }

  const handlePriceChange = ({
    fashionItemInfoId,
    price,
  }: handlePriceChangeArgs) => {
    const changedFashionItemsInfo = changeFashionItemsInfo({
      fashionItemInfoId,
      fashionItemInfoToChange: { price },
    })
    onFashionItemsInfoChange(changedFashionItemsInfo)
  }

  const handleBuyingPlaceChange = ({
    fashionItemInfoId,
    buyingPlace,
  }: HandleBuyingPlaceChangeArgs) => {
    const changedFashionItemsInfo = changeFashionItemsInfo({
      fashionItemInfoId,
      fashionItemInfoToChange: { buyingPlace },
    })
    onFashionItemsInfoChange(changedFashionItemsInfo)
  }

  return (
    <ul>
      {fashionItemsInfo.map(fashionItemInfo => (
        <li key={fashionItemInfo.id}>
          <FormControl sx={{ width: 150 }}>
            <InputLabel>아이템 종류</InputLabel>
            <Select
              label="아이템 종류"
              value={fashionItemInfo.category}
              onChange={e =>
                handleCategoryChange({
                  fashionItemInfoId: fashionItemInfo.id,
                  category: e.target.value,
                })
              }
            >
              {FASHION_ITEM_CATEGORIES.map(category => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="가격"
            type="number"
            value={fashionItemInfo.price}
            onChange={e =>
              handlePriceChange({
                fashionItemInfoId: fashionItemInfo.id,
                price: Number(e.target.value),
              })
            }
          />
          <TextField
            label="구입처"
            value={fashionItemInfo.buyingPlace}
            onChange={e =>
              handleBuyingPlaceChange({
                fashionItemInfoId: fashionItemInfo.id,
                buyingPlace: e.target.value,
              })
            }
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
      ))}
    </ul>
  )
}

export default FashionItemsInfo
