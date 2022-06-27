import { css } from '@emotion/react'
import Fab from '@mui/material/Fab'
import CheckroomIcon from '@mui/icons-material/Checkroom'
import Modal from 'components/modals/modal'
import useModalState from 'hooks/useModalState'
import FashionItemAddForm from 'components/closet/fashionItemAddForm'

const FabPositionFixed = css`
  position: fixed;
  right: 20px;
  bottom: 20px;
`

const FashionItemAddingArea = () => {
  const {
    isOpen: isFashionItemAddModalOpen,
    handleOpen: handleFashionItemAddModalOpen,
    handleClose: handleFashionItemAddModalClose,
  } = useModalState()

  return (
    <>
      <Fab
        color="primary"
        aria-label="옷장에 패션 아이템 등록"
        css={FabPositionFixed}
        onClick={handleFashionItemAddModalOpen}
      >
        <CheckroomIcon />
      </Fab>
      <Modal
        title="패션 아이템 추가"
        contents={<FashionItemAddForm />}
        open={isFashionItemAddModalOpen}
        onClose={handleFashionItemAddModalClose}
      />
    </>
  )
}

export default FashionItemAddingArea
