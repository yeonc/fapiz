import { useState } from 'react'
import Button from '@mui/material/Button'
import UserAvatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Modal from 'components/modals/modal'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import useModalState from 'hooks/useModalState'

const UserBasicInfoForm = ({
  username,
  height,
  weight,
  userImageUrl,
  buttonInModal,
}) => {
  const [imageFile, setImageFile] = useState('')

  const handleImageFileChange = imageFile => {
    setImageFile(imageFile)
  }

  return (
    <form>
      <UserAvatar
        alt={username}
        src={userImageUrl}
        sx={{ width: 70, height: 70 }}
      />
      <ImageUploadButton
        onImageFilesChange={handleImageFileChange}
        buttonAriaLabel="프로필 사진 등록"
      />
      <TextField label="유저 이름" defaultValue={username} />
      <TextField label="키" type="number" defaultValue={height} />
      <TextField label="몸무게" type="number" defaultValue={weight} />
      {buttonInModal}
    </form>
  )
}

const UserBasicInfoControlButtonAndModal = ({ button, modal }) => (
  <>
    {button}
    {modal}
  </>
)

const UserBasicInfo = ({ data }) => {
  const {
    isOpen: isUserBasicInfoModalOpen,
    handleOpen: handleUserBasicInfoModalOpen,
    handleClose: handleUserBasicInfoModalClose,
  } = useModalState()

  return (
    <>
      <UserAvatar
        alt={data.username}
        src={data.userImageUrl}
        sx={{ width: 100, height: 100 }}
      />
      <Typography variant="h4" component="h1">
        {data.username}
      </Typography>
      <dl>
        <div>
          <dt>포인트</dt>
          <dd>{data.points}</dd>
        </div>
        <div>
          <dt>레벨</dt>
          <dd>{data.level}</dd>
        </div>
      </dl>
      <dl>
        <div>
          <dt>키</dt>
          <dd>{data.height}cm</dd>
        </div>
        <div>
          <dt>몸무게</dt>
          <dd>{data.weight}kg</dd>
        </div>
      </dl>
      <UserBasicInfoControlButtonAndModal
        button={
          <Button variant="contained" onClick={handleUserBasicInfoModalOpen}>
            기본 정보 변경하기
          </Button>
        }
        modal={
          <Modal
            title="기본 정보"
            contents={
              <UserBasicInfoForm
                username={data.username}
                height={data.height}
                weight={data.weight}
                userImageUrl={data.userImageUrl}
                buttonInModal={<Button variant="contained">수정</Button>}
              />
            }
            open={isUserBasicInfoModalOpen}
            onClose={handleUserBasicInfoModalClose}
          />
        }
      />
    </>
  )
}

export default UserBasicInfo
