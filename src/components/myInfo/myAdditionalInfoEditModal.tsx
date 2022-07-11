import { useSWRConfig } from 'swr'
import Modal from 'components/modals/modal'
import MyAdditionalInfoForm from 'components/myInfo/myAdditionalInfoForm'
import { BACKEND_URL, IS_SERVER } from 'constants/constants'

const MyAdditionalInfoEditModal = ({
  myId,
  initialGender,
  initialFashionStyles,
  initialBodyShape,
  isMyAdditionalInfoEditModalOpen,
  onMyAdditionalInfoEditModalClose,
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
    onMyAdditionalInfoEditModalClose()
    refetch()
  }

  return (
    <Modal
      title="상세 정보 수정하기"
      contents={
        <MyAdditionalInfoForm
          myId={myId}
          initialGender={initialGender}
          initialFashionStyles={initialFashionStyles}
          initialBodyShape={initialBodyShape}
          afterSubmitAdditionalInfo={afterSubmitAdditionalInfo}
        />
      }
      open={isMyAdditionalInfoEditModalOpen}
      onClose={onMyAdditionalInfoEditModalClose}
    />
  )
}

export default MyAdditionalInfoEditModal
