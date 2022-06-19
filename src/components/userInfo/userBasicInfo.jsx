import { useState } from 'react'
import Button from '@mui/material/Button'
import UserAvatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Modal from 'components/modals/modal'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import useModalState from 'hooks/useModalState'

const UserBasicInfoForm = () => {
  const [imageFile, setImageFile] = useState('')

  const handleImageFileChange = imageFile => {
    setImageFile(imageFile)
  }

  return (
    <form>
      <ImageUploadButton
        onImageFilesChange={handleImageFileChange}
        buttonAriaLabel="프로필 사진 등록"
      />
      <TextField label="유저 이름" value="username" />
      <TextField label="키" type="number" value="160" />
      <TextField label="몸무게" type="number" value="50" />
      <Button variant="contained">수정</Button>
    </form>
  )
}

const UserBasicInfoControlButtonAndModal = () => {
  const {
    isOpen: isUserBasicInfoModalOpen,
    handleOpen: handleUserBasicInfoModalOpen,
    handleClose: handleUserBasicInfoModalClose,
  } = useModalState()

  return (
    <>
      <Button variant="contained" onClick={handleUserBasicInfoModalOpen}>
        기본 정보 변경하기
      </Button>
      <Modal
        title="기본 정보"
        contents={<UserBasicInfoForm />}
        open={isUserBasicInfoModalOpen}
        onClose={handleUserBasicInfoModalClose}
      />
    </>
  )
}

const UserBasicInfo = () => {
  return (
    <>
      <UserAvatar alt="choiseyeoni" src="" sx={{ width: 100, height: 100 }} />
      <Typography varient="h1" component="h1">
        choiseyeoni
      </Typography>
      <dl>
        <div>
          <dt>point</dt>
          <dd>50</dd>
        </div>
        <div>
          <dt>Level</dt>
          <dd>1</dd>
        </div>
      </dl>
      <dl>
        <div>
          <dt>키</dt>
          <dd>160cm</dd>
        </div>
        <div>
          <dt>몸무게</dt>
          <dd>50kg</dd>
        </div>
      </dl>
      <UserBasicInfoControlButtonAndModal />
    </>
  )
}

export default UserBasicInfo
