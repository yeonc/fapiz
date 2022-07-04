import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import uploadImage from 'services/users/uploadImage'
import editMyBasicInfo from 'services/users/editMyBasicInfo'

const MyBasicInfoForm = ({
  myId,
  initialUsername,
  initialHeight,
  initialWeight,
  initialAvatarUrl,
  afterEditBasicInfo,
}) => {
  const [imageFiles, setImageFiles] = useState(null)
  const [userPreviewAvatarUrl, setUserPreviewAvatarUrl] =
    useState(initialAvatarUrl)
  const [username, setUsername] = useState(initialUsername)
  const [height, setHeight] = useState(initialHeight)
  const [weight, setWeight] = useState(initialWeight)

  const handleImageFilesChange = imageFiles => {
    setImageFiles(imageFiles)
    const imageUrl = URL.createObjectURL(imageFiles[0])
    setUserPreviewAvatarUrl(imageUrl)
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

  const editBasicInfo = async uploadedImageId => {
    await editMyBasicInfo({
      myId,
      username,
      weight,
      height,
      profileImageId: uploadedImageId,
    })
  }

  const handleUserInfoSubmit = async e => {
    e.preventDefault()

    try {
      const res = await uploadImage(imageFiles)
      const uploadedImageId = res.data[0].id
      await editBasicInfo(uploadedImageId)
      afterEditBasicInfo()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleUserInfoSubmit}>
      <Avatar
        alt={username}
        src={userPreviewAvatarUrl}
        sx={{ width: 70, height: 70 }}
      />
      <ImageUploadButton
        onImageFilesChange={handleImageFilesChange}
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
      <Button variant="contained" type="submit">
        수정
      </Button>
    </form>
  )
}

export default MyBasicInfoForm
