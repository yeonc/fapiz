import { useSWRConfig } from 'swr'
import Button from '@mui/material/Button'
import Modal from 'components/modals/modal'
import useModalState from 'hooks/useModalState'
import { BACKEND_URL, IS_SERVER } from 'constants/constants'
import MyBasicInfoForm from 'components/userInfo/myBasicInfoForm'

const MyBasicInfoEditArea = ({ myBasicInfo }) => {
  const {
    isOpen: isUserBasicInfoModalOpen,
    handleOpen: handleUserBasicInfoModalOpen,
    handleClose: handleUserBasicInfoModalClose,
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

  const afterEditBasicInfo = () => {
    handleUserBasicInfoModalClose()
    refetch()
  }

  return (
    <>
      <Button variant="contained" onClick={handleUserBasicInfoModalOpen}>
        기본 정보 변경하기
      </Button>
      <Modal
        title="기본 정보"
        contents={
          <MyBasicInfoForm
            myId={myBasicInfo.id}
            initialUsername={myBasicInfo.username}
            initialHeight={myBasicInfo.height}
            initialWeight={myBasicInfo.weight}
            initialAvatarUrl={myBasicInfo.imageUrl}
            afterEditBasicInfo={afterEditBasicInfo}
          />
        }
        open={isUserBasicInfoModalOpen}
        onClose={handleUserBasicInfoModalClose}
      />
    </>
  )
}

export default MyBasicInfoEditArea
