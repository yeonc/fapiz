import { useSWRConfig } from 'swr'
import Modal from 'components/modals/modal'
import MyBasicInfoForm from 'components/myInfo/myBasicInfoForm'
import { BACKEND_URL, IS_SERVER } from 'constants/constants'

const MyBasicInfoEditModal = ({
  myId,
  initialUsername,
  initialHeight,
  initialWeight,
  initialAvatarUrl,
  isMyBasicInfoEditModalOpen,
  onMyBasicInfoEditModalClose,
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

  const afterEditBasicInfo = () => {
    onMyBasicInfoEditModalClose()
    refetch()
  }

  return (
    <Modal
      title="기본 정보"
      contents={
        <MyBasicInfoForm
          myId={myId}
          initialUsername={initialUsername}
          initialHeight={initialHeight}
          initialWeight={initialWeight}
          initialAvatarUrl={initialAvatarUrl}
          afterEditBasicInfo={afterEditBasicInfo}
        />
      }
      open={isMyBasicInfoEditModalOpen}
      onClose={onMyBasicInfoEditModalClose}
    />
  )
}

export default MyBasicInfoEditModal
