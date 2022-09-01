import styled from '@emotion/styled'
import ImageListItem from '@mui/material/ImageListItem'
import ButtonBase from '@mui/material/ButtonBase'
import FashionItemEditingModal from 'components/closet/fashionItemEditingModal'
import useModalState from 'hooks/useModalState'
import { FashionItemForClosetPage } from 'types/fashion'
import { DEFAULT_WHITE, LIGHT_GRAY } from 'styles/constants/color'

const StyledImageListItem = styled(ImageListItem)`
  position: relative;
  border: 1px solid ${LIGHT_GRAY};
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
    rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
    rgba(0, 0, 0, 0.07) 0px 16px 16px;
  cursor: pointer;

  &:hover button {
    display: block;
  }
`

const StyledButton = styled(ButtonBase)`
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
  color: ${DEFAULT_WHITE};
  background-color: rgba(0, 0, 0, 0.3);
`

type FashionItemListItemProps = {
  fashionItem: FashionItemForClosetPage
}

const FashionItemListItem = ({ fashionItem }: FashionItemListItemProps) => {
  const {
    isOpen: isFashionItemEditModalOpen,
    handleOpen: handleFashionItemEditModalOpen,
    handleClose: handleFashionItemEditModalClose,
  } = useModalState()

  return (
    <StyledImageListItem>
      <img src={fashionItem.image.url} alt={fashionItem.image.altText} />
      <StyledButton onClick={handleFashionItemEditModalOpen}>
        패션 아이템 편집
      </StyledButton>
      <FashionItemEditingModal
        onFashionItemEditModalClose={handleFashionItemEditModalClose}
        isFashionItemEditModalOpen={isFashionItemEditModalOpen}
        initialFashionItem={fashionItem}
      />
    </StyledImageListItem>
  )
}

export default FashionItemListItem
