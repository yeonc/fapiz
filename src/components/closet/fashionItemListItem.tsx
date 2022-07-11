import { css } from '@emotion/react'
import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import FashionItemEditingModal from 'components/closet/fashionItemEditingModal'
import useModalState from 'hooks/useModalState'

const StyledFashionItemListItem = styled.li`
  position: relative;
`

const fashionItemImageStyle = css`
  width: 250px;
  height: 250px;
  border-radius: 5px;
  object-fit: cover;
`

const fashionItemEditButtonStyle = css`
  position: absolute;
  right: 2px;
  bottom: 8px;
`

const FashionItemListItem = ({ fashionItem }) => {
  const {
    isOpen: isFashionItemEditModalOpen,
    handleOpen: handleFashionItemEditModalOpen,
    handleClose: handleFashionItemEditModalClose,
  } = useModalState()

  return (
    <StyledFashionItemListItem>
      <img
        src={fashionItem.image.url}
        alt={fashionItem.image.altText}
        css={fashionItemImageStyle}
      />
      <IconButton
        color="primary"
        aria-label="패션 아이템 편집"
        css={fashionItemEditButtonStyle}
        onClick={handleFashionItemEditModalOpen}
      >
        <EditIcon />
      </IconButton>
      <FashionItemEditingModal
        onFashionItemEditModalClose={handleFashionItemEditModalClose}
        isFashionItemEditModalOpen={isFashionItemEditModalOpen}
        initialFashionItem={fashionItem}
      />
    </StyledFashionItemListItem>
  )
}

export default FashionItemListItem
