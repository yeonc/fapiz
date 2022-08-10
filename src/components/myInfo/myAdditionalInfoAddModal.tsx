import { useSWRConfig } from 'swr'
import Modal from 'components/common/modals/modal'
import MyAdditionalInfoForm from 'components/myInfo/myAdditionalInfoForm'
import { BACKEND_URL, IS_SERVER } from 'constants/constants'

const MyAdditionalInfoAddModal = ({
  myId,
  onMyAdditionalInfoAddModalClose,
  isMyAdditionalInfoAddModalOpen,
}) => {
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
    onMyAdditionalInfoAddModalClose()
    refetch()
  }

  return (
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
      open={isMyAdditionalInfoAddModalOpen}
      onClose={onMyAdditionalInfoAddModalClose}
    />
  )
}

export default MyAdditionalInfoAddModal
