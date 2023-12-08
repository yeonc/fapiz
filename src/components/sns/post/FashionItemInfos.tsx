import { css } from '@emotion/react'
import IconButton from '@mui/material/IconButton'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { FASHION_ITEM_CATEGORIES } from 'constants/fashionItem'
import { FashionItemInfo, FashionItemCategoryName } from 'types/fashion'
import styled from '@emotion/styled'
import { Id } from 'types/common'

const ITEM_TYPE_TEXT = '아이템 종류'

const StyledFashionItemInfo = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`

const formControlWidth = css`
  width: 150px;
`

type FashionItemInfoToChange = Partial<FashionItemInfo>

type ChangeFashionItemInfosArgs = {
  fashionItemInfoId: Id
  fashionItemInfoToChange: FashionItemInfoToChange
}

type ChangedFashionItemInfos = FashionItemInfo[]

type ChangeFashionItemInfos = (
  args: ChangeFashionItemInfosArgs
) => ChangedFashionItemInfos

type HandleCategoryChangeArgs = {
  fashionItemInfoId: Id
  category: FashionItemCategoryName
}

type handlePriceChangeArgs = {
  fashionItemInfoId: Id
  price: number
}

type HandleBuyingPlaceChangeArgs = {
  fashionItemInfoId: Id
  buyingPlace: string
}

type FashionItemInfosProps = {
  fashionItemInfos: FashionItemInfo[]
  onFashionItemInfosChange: (fashionItemInfos: FashionItemInfo[]) => void
  onFashionItemInfoDeleteButtonClick: (
    fashionItemInfoIdToDelete: number
  ) => void
  className?: string
}

const FashionItemInfos = ({
  fashionItemInfos: fashionItemInfos,
  onFashionItemInfosChange: onFashionItemInfosChange,
  onFashionItemInfoDeleteButtonClick,
  className,
}: FashionItemInfosProps) => {
  const changeFashionItemInfos: ChangeFashionItemInfos = ({
    fashionItemInfoId,
    fashionItemInfoToChange,
  }) => {
    const changedFashionItemInfos = fashionItemInfos.map(fashionItemInfo => {
      if (fashionItemInfo.id === fashionItemInfoId) {
        return {
          ...fashionItemInfo,
          ...fashionItemInfoToChange,
        }
      }
      return fashionItemInfo
    })
    return changedFashionItemInfos
  }

  const handleCategoryChange = ({
    fashionItemInfoId,
    category,
  }: HandleCategoryChangeArgs) => {
    const changedFashionItemInfos = changeFashionItemInfos({
      fashionItemInfoId,
      fashionItemInfoToChange: { category },
    })
    onFashionItemInfosChange(changedFashionItemInfos)
  }

  const handlePriceChange = ({
    fashionItemInfoId,
    price,
  }: handlePriceChangeArgs) => {
    const priceValue = !Number.isNaN(price) ? price : null
    const changedFashionItemInfos = changeFashionItemInfos({
      fashionItemInfoId,
      fashionItemInfoToChange: { price: priceValue },
    })
    onFashionItemInfosChange(changedFashionItemInfos)
  }

  const handleBuyingPlaceChange = ({
    fashionItemInfoId,
    buyingPlace,
  }: HandleBuyingPlaceChangeArgs) => {
    const changedFashionItemInfos = changeFashionItemInfos({
      fashionItemInfoId,
      fashionItemInfoToChange: { buyingPlace },
    })
    onFashionItemInfosChange(changedFashionItemInfos)
  }

  return (
    <ul className={className}>
      {fashionItemInfos.map(fashionItemInfo => (
        <StyledFashionItemInfo key={fashionItemInfo.id}>
          <FormControl css={formControlWidth}>
            <InputLabel>{ITEM_TYPE_TEXT}</InputLabel>
            <Select
              label={ITEM_TYPE_TEXT}
              value={fashionItemInfo.category}
              onChange={e =>
                handleCategoryChange({
                  fashionItemInfoId: fashionItemInfo.id,
                  category: e.target.value as FashionItemCategoryName,
                })
              }
              required
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
            value={fashionItemInfo.price ?? ''}
            onChange={e =>
              handlePriceChange({
                fashionItemInfoId: fashionItemInfo.id,
                price: (e.target as HTMLInputElement).valueAsNumber,
              })
            }
            required
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
            required
          />
          <IconButton
            color="primary"
            onClick={() =>
              onFashionItemInfoDeleteButtonClick(fashionItemInfo.id)
            }
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
        </StyledFashionItemInfo>
      ))}
    </ul>
  )
}

export default FashionItemInfos
