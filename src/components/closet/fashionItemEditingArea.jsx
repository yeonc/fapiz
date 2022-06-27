import { css } from '@emotion/react'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import Modal from 'components/modals/modal'
import FashionItemEditForm from 'components/closet/fashionItemEditForm'
import useModalState from 'hooks/useModalState'

const fashionItemEditButtonStyle = css`
  position: absolute;
  right: 2px;
  bottom: 8px;
`

const FashionItemEditingArea = ({ initialFashionItem }) => {
  const {
    isOpen: isFashionItemEditModalOpen,
    handleOpen: handleFashionItemEditModalOpen,
    handleClose: handleFashionItemEditModalClose,
  } = useModalState()

  return (
    <>
      <IconButton
        color="primary"
        aria-label="패션 아이템 편집"
        css={fashionItemEditButtonStyle}
        onClick={handleFashionItemEditModalOpen}
      >
        <EditIcon />
      </IconButton>
      <Modal
        title="패션 아이템 편집"
        contents={
          <FashionItemEditForm initialFashionItem={initialFashionItem} />
        }
        open={isFashionItemEditModalOpen}
        onClose={handleFashionItemEditModalClose}
      />
    </>
  )
}

export default FashionItemEditingArea
