import { useSWRConfig } from 'swr'
import Button from '@mui/material/Button'
import Modal from 'components/modals/modal'
import MyAdditionalInfoForm from 'components/myInfo/myAdditionalInfoForm'
import useModalState from 'hooks/useModalState'
import { BACKEND_URL, IS_SERVER } from 'constants/constants'

const MyAdditionalInfoEditArea = ({ myAdditionalInfo }) => {
  const {
    isOpen: isMyAdditionalInfoModalOpen,
    handleOpen: handleMyAdditionalInfoModalOpen,
    handleClose: handleMyAdditionalInfoModalClose,
  } = useModalState()

  const { mutate } = useSWRConfig()
  const refetch = () => {
    const token = !IS_SERVER && localStorage.getItem('jwt')
    if (!token) return

    mutate({
      url: `${BACKEND_URL}/api/users/me`,
      config: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })
  }

  const afterSubmitAdditionalInfo = () => {
    handleMyAdditionalInfoModalClose()
    refetch()
  }

  return (
    <>
      <Button variant="contained" onClick={handleMyAdditionalInfoModalOpen}>
        상세 정보 수정
      </Button>
      <Modal
        title="상세 정보 수정하기"
        contents={
          <MyAdditionalInfoForm
            myId={myAdditionalInfo.id}
            initialGender={myAdditionalInfo.gender}
            initialFashionStyles={myAdditionalInfo.fashionStyles}
            initialBodyShape={myAdditionalInfo.bodyShape}
            afterSubmitAdditionalInfo={afterSubmitAdditionalInfo}
          />
        }
        open={isMyAdditionalInfoModalOpen}
        onClose={handleMyAdditionalInfoModalClose}
      />
    </>
  )
}

export default MyAdditionalInfoEditArea
