import Button from '@mui/material/Button'
import useModalState from 'hooks/useModalState'
import MyBasicInfoEditModal from 'components/myInfo/myBasicInfoEditModal'

const MyBasicInfoEditArea = ({ myBasicInfo }) => {
  const {
    isOpen: isMyBasicInfoEditModalOpen,
    handleOpen: handleMyBasicInfoEditModalOpen,
    handleClose: handleMyBasicInfoEditModalClose,
  } = useModalState()

  return (
    <>
      <Button variant="contained" onClick={handleMyBasicInfoEditModalOpen}>
        기본 정보 변경하기
      </Button>
      <MyBasicInfoEditModal
        myId={myBasicInfo.id}
        initialUsername={myBasicInfo.username}
        initialHeight={myBasicInfo.height}
        initialWeight={myBasicInfo.weight}
        initialAvatarUrl={myBasicInfo.imageUrl}
        isMyBasicInfoEditModalOpen={isMyBasicInfoEditModalOpen}
        onMyBasicInfoEditModalClose={handleMyBasicInfoEditModalClose}
      />
    </>
  )
}

export default MyBasicInfoEditArea
