import { useSWRConfig } from 'swr'
import Button from '@mui/material/Button'
import Modal from 'components/modals/modal'
import MyAdditionalInfoForm from 'components/myInfo/myAdditionalInfoForm'
import useModalState from 'hooks/useModalState'
import { IS_SERVER } from 'constants/constants'

const MyAdditionalInfoAddArea = ({ myId }) => {
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
      <p>상세 정보를 입력하고 나와 같은 스타일의 유저들을 만나보세요!</p>
      <Button varient="contained" onClick={handleMyAdditionalInfoModalOpen}>
        상세 정보 입력하러 가기
      </Button>
      <Modal
        title="상세 정보 입력하기"
        contents={
          <MyAdditionalInfoForm
            myId={myId}
            initialGender=""
            initialFashionStyles={[]}
            initialBodyShape=""
            afterSubmitAdditionalInfo={afterSubmitAdditionalInfo}
          />
        }
        open={isMyAdditionalInfoModalOpen}
        onClose={handleMyAdditionalInfoModalClose}
      />
    </>
  )
}

export default MyAdditionalInfoAddArea
