import Button from '@mui/material/Button'
import useModalState from 'hooks/useModalState'
import MyAdditionalInfoAddModal from 'components/myInfo/myAdditionalInfoAddModal'

const MyAdditionalInfoAddArea = ({ myId }) => {
  const {
    isOpen: isMyAdditionalInfoAddModalOpen,
    handleOpen: handleMyAdditionalInfoAddModalOpen,
    handleClose: handleMyAdditionalInfoAddModalClose,
  } = useModalState()

  return (
    <>
      <p>상세 정보를 입력하고 나와 같은 스타일의 유저들을 만나보세요!</p>
      <Button varient="contained" onClick={handleMyAdditionalInfoAddModalOpen}>
        상세 정보 입력하러 가기
      </Button>
      <MyAdditionalInfoAddModal
        myId={myId}
        onMyAdditionalInfoAddModalClose={handleMyAdditionalInfoAddModalClose}
        isMyAdditionalInfoAddModalOpen={isMyAdditionalInfoAddModalOpen}
      />
    </>
  )
}

export default MyAdditionalInfoAddArea
