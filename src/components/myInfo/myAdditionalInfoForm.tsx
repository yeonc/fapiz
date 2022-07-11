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
import editMyAdditionalInfo from 'services/users/editMyAdditionalInfo'

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
          {GENDER_LIST.map(genderItem => (
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
          {BODY_SHAPE_LIST.map(bodyShapeItem => (
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
          {FASHION_STYLE_LIST.map(fashionStyleItem => {
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

const GENDER_LIST = [
  { id: 1, name: '남' },
  { id: 2, name: '여' },
]

const BODY_SHAPE_LIST = [
  { id: 1, name: '삼각형' },
  { id: 2, name: '역삼각형' },
  { id: 3, name: '타원형' },
  { id: 4, name: '직사각형' },
  { id: 5, name: '모래시계형' },
  { id: 6, name: '사다리꼴형' },
]

const FASHION_STYLE_LIST = [
  { id: 1, name: '캐주얼' },
  { id: 2, name: '스트릿' },
  { id: 3, name: '빈티지' },
  { id: 4, name: '시크' },
  { id: 5, name: '페미닌' },
  { id: 6, name: '스포티' },
  { id: 7, name: '모던' },
  { id: 8, name: '럭셔리' },
  { id: 9, name: '댄디' },
  { id: 10, name: '클래식' },
  { id: 11, name: '아메카지' },
  { id: 12, name: '힙스터' },
]
