import { useState } from 'react'
import { useSWRConfig } from 'swr'
import Button from '@mui/material/Button'
import UserAvatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Modal from 'components/modals/modal'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import useMe from 'hooks/useMe'
import useModalState from 'hooks/useModalState'
import uploadImage from 'services/users/uploadImage'
import editUserBasicInfo from 'services/users/editUserBasicInfo'
import { BACKEND_URL, IS_SERVER } from 'constants/constants'

const UserBasicInfoForm = ({
  userId,
  prevUsername,
  prevHeight,
  prevWeight,
  prevUserImageUrl,
  buttonInModal,
  onModalClose,
}) => {
  const { mutate } = useSWRConfig()
  const refetch = () => {
    const token = !IS_SERVER && localStorage.getItem('jwt')
    mutate(
      token
        ? {
            url: `${BACKEND_URL}/api/users/me`,
            config: {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          }
        : null
    )
  }

  const [imageFile, setImageFile] = useState('')
  const [userImageUrl, setUserImageUrl] = useState(prevUserImageUrl)
  const [username, setUsername] = useState(prevUsername)
  const [height, setHeight] = useState(prevHeight)
  const [weight, setWeight] = useState(prevWeight)

  const createUrl = file => URL.createObjectURL(file[0])

  const handleImageFileChange = imageFile => {
    setImageFile(imageFile)
    const imageUrl = createUrl(imageFile)
    setUserImageUrl(imageUrl)
  }

  const handleUsernameChange = username => {
    setUsername(username)
  }

  const handleHeightChange = height => {
    setHeight(height)
  }

  const handleWeightChange = weight => {
    setWeight(weight)
  }

  const editBasicInfo = async res => {
    const uploadedImageId = res.data[0].id
    await editUserBasicInfo({
      userId,
      username,
      weight,
      height,
      profileImageId: uploadedImageId,
    })
  }

  const afterEditBasicInfo = () => {
    onModalClose()
    refetch()
  }

  const handleUserInfoSubmit = async e => {
    e.preventDefault()

    try {
      const res = await uploadImage(imageFile)
      await editBasicInfo(res)
      afterEditBasicInfo()
    } catch {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleUserInfoSubmit}>
      <UserAvatar
        alt={username}
        src={userImageUrl}
        sx={{ width: 70, height: 70 }}
      />
      <ImageUploadButton
        onImageFilesChange={handleImageFileChange}
        buttonAriaLabel="프로필 사진 등록"
      />
      <TextField
        label="유저 이름"
        value={username}
        onChange={e => handleUsernameChange(e.target.value)}
      />
      <TextField
        label="키"
        type="number"
        value={height}
        onChange={e => handleHeightChange(e.target.value)}
      />
      <TextField
        label="몸무게"
        type="number"
        value={weight}
        onChange={e => handleWeightChange(e.target.value)}
      />
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
  const { me } = useMe()

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
                userId={me.id}
                prevUsername={data.username}
                prevHeight={data.height}
                prevWeight={data.weight}
                prevUserImageUrl={data.userImageUrl}
                buttonInModal={
                  <Button variant="contained" type="submit">
                    수정
                  </Button>
                }
                onModalClose={handleUserBasicInfoModalClose}
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
