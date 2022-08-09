import { useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import editMyAdditionalInfo from 'services/myInfo/editMyAdditionalInfo'
import {
  USER_GENDERS,
  USER_BODY_SHAPES,
  USER_FASHION_STYLES,
} from 'constants/user'

const MyAdditionalInfoForm = ({
  myId,
  initialGender,
  initialFashionStyles,
  initialBodyShape,
  afterSubmitAdditionalInfo,
}) => {
  const [fashionStyles, setFashionStyles] = useState(initialFashionStyles)
  const [gender, setGender] = useState(initialGender)
  const [bodyShape, setBodyShape] = useState(initialBodyShape)

  const handleGenderChange = (gender: any) => {
    setGender(gender)
  }

  const handleBodyShapeChange = (bodyShape: any) => {
    setBodyShape(bodyShape)
  }

  const handleFashionStyleChange = (fashionStyle: any) => (e: any) => {
    if (e.target.checked === true) {
      setFashionStyles((fashionStyles: any) => [...fashionStyles, fashionStyle])
    }

    if (e.target.checked === false) {
      const filteredFashionStyles = fashionStyles.filter(
        (style: any) => style.name !== fashionStyle.name
      )
      setFashionStyles(filteredFashionStyles)
    }
  }

  const editAdditionalInfo = async () => {
    await editMyAdditionalInfo({ myId, gender, bodyShape, fashionStyles })
  }

  const handleUserInfoSubmit = async (e: any) => {
    e.preventDefault()

    try {
      await editAdditionalInfo()
      afterSubmitAdditionalInfo()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleUserInfoSubmit}>
      <FormControl>
        <FormLabel>성별</FormLabel>
        <RadioGroup
          row
          value={gender}
          onChange={e => handleGenderChange(e.target.value)}
        >
          {USER_GENDERS.map(genderItem => (
            <FormControlLabel
              key={genderItem.id}
              value={genderItem.name}
              control={<Radio />}
              label={genderItem.name}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel>체형</FormLabel>
        <RadioGroup
          row
          value={bodyShape}
          onChange={e => handleBodyShapeChange(e.target.value)}
        >
          {USER_BODY_SHAPES.map(bodyShapeItem => (
            <FormControlLabel
              key={bodyShapeItem.id}
              value={bodyShapeItem.name}
              control={<Radio />}
              label={bodyShapeItem.name}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel>패션 스타일</FormLabel>
        <FormGroup>
          {USER_FASHION_STYLES.map(fashionStyleItem => {
            const isChecked =
              fashionStyles.length === 0
                ? false
                : fashionStyles.some(
                    (fashionStyle: any) =>
                      fashionStyle.id === fashionStyleItem.id
                  )

            return (
              <FormControlLabel
                key={fashionStyleItem.id}
                value={fashionStyleItem.name}
                control={
                  <Checkbox
                    checked={isChecked}
                    onClick={handleFashionStyleChange(fashionStyleItem)}
                  />
                }
                label={fashionStyleItem.name}
              />
            )
          })}
        </FormGroup>
        <FormHelperText>3개까지 선택 가능</FormHelperText>
      </FormControl>
      <Button variant="contained" type="submit">
        수정
      </Button>
    </form>
  )
}

export default MyAdditionalInfoForm
