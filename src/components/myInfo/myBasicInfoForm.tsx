import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import uploadImage from 'services/users/uploadImage'
import editMyBasicInfo from 'services/users/editMyBasicInfo'

type UploadedImageId = number | undefined

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

  const handleImageFilesChange = (imageFiles: any) => {
    setImageFiles(imageFiles)
    const imageUrl = URL.createObjectURL(imageFiles[0])
    setUserPreviewAvatarUrl(imageUrl)
  }

  const handleUsernameChange = (username: any) => {
    setUsername(username)
  }

  const handleHeightChange = (height: any) => {
    setHeight(height)
  }

  const handleWeightChange = (weight: any) => {
    setWeight(weight)
  }

  const getUploadedImageId = async (): Promise<UploadedImageId> => {
    if (!imageFiles) {
      return
    }

    const res = await uploadImage(imageFiles)
    const uploadedImageId: number = res.data[0].id

    return uploadedImageId
  }

  const editBasicInfo = async () => {
    const profileImageId = await getUploadedImageId()

    await editMyBasicInfo({
      myId,
      username,
      weight,
      height,
      profileImageId,
    })
  }

  const handleUserInfoSubmit = async (e: any) => {
    e.preventDefault()

    try {
      await editBasicInfo()
      afterEditBasicInfo()
    } catch (error) {
      console.error(error)
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
