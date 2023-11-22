import { FormEvent, useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import LoadingButton from '@mui/lab/LoadingButton'
import Typo from 'components/common/typo'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import Badge from '@mui/material/Badge'
import InputAdornment from '@mui/material/InputAdornment'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import editMyInfo from 'services/user/editMyInfo'
import uploadImage from 'services/upload/uploadImage'
import { changeImageFileToPreviewImage } from 'utils/previewImage'
import compareTwoArrays from 'utils/compareTwoArrays'
import {
  USER_BODY_SHAPES,
  USER_FASHION_STYLES,
  USER_GENDERS,
} from 'constants/user'
import { ImageFiles, Image } from 'types/image'
import { Nullable } from 'types/common'
import { DEFAULT_BLACK, DEFAULT_WHITE } from 'styles/constants/color'
import { mgBottom, mgRight } from 'styles/layout'
import { FashionStyle } from 'types/fashion'
import { UserForMyInfo } from 'pages/my-info'

const StyledAvatarAndUsernameWrapper = styled.div`
  text-align: center;
  margin-bottom: 50px;
`

const StyledUsernameAndGenderInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`

const StyledHeightAndWeightInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`

const StyledBodyShapeAndFashionStyleInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`

const StyledUserInfoEditAndCancelButtonWrapper = styled.div`
  text-align: center;
`

const StyledImageUploadButton = styled(ImageUploadButton)`
  background-color: ${DEFAULT_BLACK};
  color: ${DEFAULT_WHITE};
`

const avatarStyle = css`
  width: 200px;
  height: 200px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
`

const inputWidth = css`
  width: 35%;
`

type FashionStyleId = FashionStyle['id']

type MyInfoEditFormProps = {
  myInfo: UserForMyInfo
}

const MyInfoEditForm = ({ myInfo }: MyInfoEditFormProps) => {
  const [avatarImageFiles, setAvatarImageFiles] = useState<ImageFiles>(null)
  const [previewAvatar, setPreviewAvatar] = useState<Nullable<Image>>(null)
  const [username, setUsername] = useState(myInfo.username)
  const [gender, setGender] = useState(myInfo.gender)
  const [height, setHeight] = useState(myInfo.height)
  const [weight, setWeight] = useState(myInfo.weight)
  const [bodyShape, setBodyShape] = useState(myInfo.bodyShape)
  const [fashionStyles, setFashionStyles] = useState(myInfo.fashionStyles)
  const [isMyInfoEditLoading, setIsMyInfoEditLoading] = useState(false)
  const [isEditButtonActivated, setIsEditButtonActivated] = useState(false)

  const avatarImageSrc = previewAvatar ? previewAvatar.url : myInfo.imageUrl
  const avatarImageAlt = previewAvatar ? previewAvatar.altText : myInfo.username

  const changeEditButtonActivateMode = (activateMode: boolean) => {
    setIsEditButtonActivated(activateMode)
  }

  const handleAvatarImageFilesChange = (imageFiles: FileList) => {
    setEditButtonStateByAvatarImageFilesChange({
      avatarImageFiles,
      changeEditButtonActivateMode,
    })
    setAvatarImageFiles(imageFiles)
    const previewAvatarImage = changeImageFileToPreviewImage(imageFiles[0])
    setPreviewAvatar(previewAvatarImage)
  }

  const handleUsernameChange = (username: string) => {
    setEditButtonStateByPrimitiveValueChange({
      initialValue: myInfo.username,
      inputValue: username,
      changeEditButtonActivateMode,
    })
    setUsername(username)
  }

  const handleGenderChange = (gender: string) => {
    setEditButtonStateByPrimitiveValueChange({
      initialValue: myInfo.gender,
      inputValue: gender,
      changeEditButtonActivateMode,
    })
    setGender(gender)
  }

  const handleHeightChange = (height: number) => {
    setEditButtonStateByPrimitiveValueChange({
      initialValue: myInfo.height,
      inputValue: height,
      changeEditButtonActivateMode,
    })
    setHeight(height)
  }

  const handleWeightChange = (weight: number) => {
    setEditButtonStateByPrimitiveValueChange({
      initialValue: myInfo.weight,
      inputValue: weight,
      changeEditButtonActivateMode,
    })
    setWeight(weight)
  }

  const handleBodyShapeChange = (bodyShape: string) => {
    setEditButtonStateByPrimitiveValueChange({
      initialValue: myInfo.bodyShape,
      inputValue: bodyShape,
      changeEditButtonActivateMode,
    })
    setBodyShape(bodyShape)
  }

  const handleFashionStylesChange = (fashionStyles: FashionStyle[]) => {
    setEditButtonStateByFashionStylesChange({
      initialFashionStyles: myInfo.fashionStyles,
      fashionStylesOfInput: fashionStyles,
      changeEditButtonActivateMode,
    })
    setFashionStyles(fashionStyles)
  }

  const editInfo = async () => {
    let uploadedImageId: number | undefined

    if (avatarImageFiles) {
      const res = await uploadImage(avatarImageFiles)
      uploadedImageId = res.data[0].id
    }

    await editMyInfo({
      myId: myInfo.id,
      profileImageId: uploadedImageId,
      username,
      gender,
      height,
      weight,
      bodyShape,
      fashionStyles,
    })
  }

  const handleMyInfoSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setIsMyInfoEditLoading(true)
      await editInfo()
      setIsMyInfoEditLoading(false)
      changeEditButtonActivateMode(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleMyInfoSubmit}>
      <StyledAvatarAndUsernameWrapper>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <StyledImageUploadButton
              onImageFilesChange={handleAvatarImageFilesChange}
              buttonAriaLabel="유저 아바타 변경"
              isImageRequired={false}
            />
          }
          css={mgBottom(10)}
        >
          <Avatar src={avatarImageSrc} alt={avatarImageAlt} css={avatarStyle} />
        </Badge>
        <Typo variant="h4" component="h1">
          {myInfo.username}
        </Typo>
      </StyledAvatarAndUsernameWrapper>
      <StyledUsernameAndGenderInputWrapper>
        <TextField
          label="유저 이름"
          value={username}
          onChange={e => handleUsernameChange(e.target.value)}
          required
          css={[inputWidth, mgRight(20)]}
        />
        <FormControl css={inputWidth}>
          <InputLabel>성별</InputLabel>
          <Select
            label="성별"
            value={gender}
            onChange={e => handleGenderChange(e.target.value)}
          >
            {USER_GENDERS.map(gender => (
              <MenuItem key={gender.id} value={gender.name}>
                {gender.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </StyledUsernameAndGenderInputWrapper>
      <StyledHeightAndWeightInputWrapper>
        <TextField
          label="키"
          type="number"
          value={height}
          onChange={e => handleHeightChange(Number(e.target.value))}
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
          css={[inputWidth, mgRight(20)]}
        />
        <TextField
          label="몸무게"
          type="number"
          value={weight}
          onChange={e => handleWeightChange(Number(e.target.value))}
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
          css={inputWidth}
        />
      </StyledHeightAndWeightInputWrapper>
      <StyledBodyShapeAndFashionStyleInputWrapper>
        <FormControl css={[inputWidth, mgRight(20)]}>
          <InputLabel>체형</InputLabel>
          <Select
            label="체형"
            value={bodyShape}
            onChange={e => handleBodyShapeChange(e.target.value)}
          >
            {USER_BODY_SHAPES.map(bodyShape => (
              <MenuItem key={bodyShape.id} value={bodyShape.name}>
                {bodyShape.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl css={inputWidth}>
          <InputLabel>패션 스타일</InputLabel>
          <Select
            label="패션 스타일"
            multiple
            value={convertFashionStyleObjectsToFashionStyleIds(fashionStyles)}
            onChange={e =>
              handleFashionStylesChange(
                convertFashionStyleIdsToFashionStyleObjects(
                  e.target.value as FashionStyleId[]
                )
              )
            }
            renderValue={selectedFashionStyleIds => {
              const fashionStyles = convertFashionStyleIdsToFashionStyleObjects(
                selectedFashionStyleIds
              )

              return (
                <div>
                  {fashionStyles.map(fashionStyle => (
                    <Chip
                      key={fashionStyle.id}
                      label={fashionStyle.name}
                      size="small"
                    />
                  ))}
                </div>
              )
            }}
          >
            {USER_FASHION_STYLES.map(fashionStyle => (
              <MenuItem key={fashionStyle.id} value={fashionStyle.id}>
                {fashionStyle.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </StyledBodyShapeAndFashionStyleInputWrapper>
      <StyledUserInfoEditAndCancelButtonWrapper>
        <LoadingButton
          variant="contained"
          type="submit"
          css={mgRight(10)}
          disabled={!isEditButtonActivated}
          loading={isMyInfoEditLoading}
          loadingPosition="center"
        >
          수정
        </LoadingButton>
      </StyledUserInfoEditAndCancelButtonWrapper>
    </form>
  )
}

export default MyInfoEditForm

type SetEditButtonStateByAvatarImageFilesChangeArgs = {
  avatarImageFiles: ImageFiles
  changeEditButtonActivateMode: (activateMode: boolean) => void
}

const setEditButtonStateByAvatarImageFilesChange = ({
  avatarImageFiles,
  changeEditButtonActivateMode,
}: SetEditButtonStateByAvatarImageFilesChangeArgs) => {
  if (avatarImageFiles === null) {
    changeEditButtonActivateMode(false)
  }

  changeEditButtonActivateMode(true)
}

type SetEditButtonStateByPrimitiveValueChangeArgs = {
  initialValue: string | number
  inputValue: string | number
  changeEditButtonActivateMode: (activateMode: boolean) => void
}

const setEditButtonStateByPrimitiveValueChange = ({
  initialValue,
  inputValue,
  changeEditButtonActivateMode,
}: SetEditButtonStateByPrimitiveValueChangeArgs) => {
  if (initialValue === inputValue) {
    changeEditButtonActivateMode(false)
  }

  if (initialValue !== inputValue) {
    changeEditButtonActivateMode(true)
  }
}

type SetEditButtonStateByFashionStylesChangeArgs = {
  initialFashionStyles: FashionStyle[]
  fashionStylesOfInput: FashionStyle[]
  changeEditButtonActivateMode: (activateMode: boolean) => void
}

const setEditButtonStateByFashionStylesChange = ({
  initialFashionStyles,
  fashionStylesOfInput,
  changeEditButtonActivateMode,
}: SetEditButtonStateByFashionStylesChangeArgs) => {
  const areTwoFashionStyesEqual = compareTwoArrays({
    firstArray: initialFashionStyles,
    secondArray: fashionStylesOfInput,
  })

  if (!areTwoFashionStyesEqual) {
    changeEditButtonActivateMode(true)
  }

  if (areTwoFashionStyesEqual) {
    changeEditButtonActivateMode(false)
  }
}

const convertFashionStyleIdsToFashionStyleObjects = (
  fashionStyles: FashionStyleId[]
): FashionStyle[] => {
  return fashionStyles.map(fashionStyleId => {
    const foundedFashionStyleObject = USER_FASHION_STYLES.find(
      fashionStyle => fashionStyle.id === fashionStyleId
    )
    return foundedFashionStyleObject
  }) as FashionStyle[]
}

const convertFashionStyleObjectsToFashionStyleIds = (
  fashionStyles: FashionStyle[]
): FashionStyleId[] => {
  return fashionStyles.map(fashionStyle => fashionStyle.id)
}
