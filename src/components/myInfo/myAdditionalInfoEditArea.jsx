import Button from '@mui/material/Button'
import MyAdditionalInfoEditModal from 'components/myInfo/myAdditionalInfoEditModal'
import useModalState from 'hooks/useModalState'

const MyAdditionalInfoEditArea = ({ myAdditionalInfo }) => {
  const {
    isOpen: isMyAdditionalInfoEditModalOpen,
    handleOpen: handleMyAdditionalInfoEditModalOpen,
    handleClose: handleMyAdditionalInfoEditModalClose,
  } = useModalState()

  return (
    <>
      <Button variant="contained" onClick={handleMyAdditionalInfoEditModalOpen}>
        상세 정보 수정
      </Button>
      <MyAdditionalInfoEditModal
        myId={myAdditionalInfo.id}
        initialGender={myAdditionalInfo.gender}
        initialFashionStyles={myAdditionalInfo.fashionStyles}
        initialBodyShape={myAdditionalInfo.bodyShape}
        isMyAdditionalInfoEditModalOpen={isMyAdditionalInfoEditModalOpen}
        onMyAdditionalInfoEditModalClose={handleMyAdditionalInfoEditModalClose}
      />
    </>
  )
}

export default MyAdditionalInfoEditArea
