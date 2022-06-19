import { useState } from 'react'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Checkbox from '@mui/material/Checkbox'
import FormHelperText from '@mui/material/FormHelperText'
import Modal from 'components/modals/modal'
import useModalState from 'hooks/useModalState'

const UserDetailInfoForm = ({ buttonInModal }) => {
  const [fashionStyles, setFashionStyles] = useState([])

  const handleFashionStyleChange = fashionStyle => e => {
    if (e.target.checked === true) {
      fashionStyles.push(fashionStyle)
      setFashionStyles([...fashionStyles])
      console.log(fashionStyles)
    }

    if (e.target.checked === false) {
      const filteredFashionStyles = fashionStyles.filter(
        style => style.name !== fashionStyle.name
      )
      setFashionStyles([...filteredFashionStyles])
      console.log(fashionStyles) // 다시 살펴볼 것! 왜 출력될 때 아이템이 빠지지 않은 상태인지
    }
  }

  return (
    <>
      <FormControl>
        <FormLabel>성별</FormLabel>
        <RadioGroup row name="gender">
          {GENDERS.map(gender => (
            <FormControlLabel
              key={gender.id}
              value={gender.englishName}
              control={<Radio />}
              label={gender.koreaName}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel>체형</FormLabel>
        <RadioGroup row>
          {BODY_SHAPES.map(bodyShape => (
            <FormControlLabel
              key={bodyShape.id}
              value={bodyShape.englishName}
              control={<Radio />}
              label={bodyShape.koreaName}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel>패션 스타일</FormLabel>
        <FormGroup>
          {FASHION_STYLES.map(fashionStyle => (
            <FormControlLabel
              key={fashionStyle.id}
              control={
                <Checkbox onChange={handleFashionStyleChange(fashionStyle)} />
              }
              label={fashionStyle.name}
            />
          ))}
        </FormGroup>
        <FormHelperText>3개까지 선택 가능</FormHelperText>
      </FormControl>
      {buttonInModal}
    </>
  )
}

const UserDetailInfoControlButtonAndModal = ({
  buttonText,
  modalTitleText,
  buttonTextinModal,
}) => {
  const {
    isOpen: isUserDetailInfoModalOpen,
    handleOpen: handleUserDetailInfoModalOpen,
    handleClose: handleUserDetailInfoModalClose,
  } = useModalState()

  return (
    <>
      <Button varient="contained" onClick={handleUserDetailInfoModalOpen}>
        {buttonText}
      </Button>
      <Modal
        title={modalTitleText}
        contents={
          <UserDetailInfoForm
            buttonInModal={
              <Button variant="contained">{buttonTextinModal}</Button>
            }
          />
        }
        open={isUserDetailInfoModalOpen}
        onClose={handleUserDetailInfoModalClose}
      />
    </>
  )
}

const UserDetailInfo = () => {
  return (
    <>
      {/* 유저의 상세 정보(성별, 옷 스타일, 체형) 데이터가 하나도 없다면 렌더링 될 부분 */}
      <p>상세 정보를 입력하고 나와 같은 스타일의 유저들을 만나보세요!</p>
      <UserDetailInfoControlButtonAndModal
        buttonText="상세 정보 입력하러 가기"
        modalTitleText="상세 정보 입력하기"
        buttonTextinModal="등록"
      />

      <dl>
        <div>
          <dt>성별</dt>
          <dd>여</dd>
        </div>
        <div>
          <dt>옷 스타일</dt>
          <dd>캐주얼, 빈티지, 시크</dd>
        </div>
        <div>
          <dt>체형</dt>
          <dd>모래시계형</dd>
        </div>
      </dl>
      <UserDetailInfoControlButtonAndModal
        buttonText="상세 정보 수정"
        modalTitleText="상세 정보 수정하기"
        buttonTextinModal="수정"
      />
    </>
  )
}

export default UserDetailInfo

const GENDERS = [
  { id: 1, englishName: 'male', koreaName: '남' },
  { id: 2, englishName: 'female', koreaName: '여' },
]

const BODY_SHAPES = [
  { id: 1, englishName: 'triangle', koreaName: '삼각형' },
  { id: 2, englishName: 'inverted-triangle', koreaName: '역삼각형' },
  { id: 3, englishName: 'oval', koreaName: '타원형' },
  { id: 4, englishName: 'rectangle', koreaName: '직사각형' },
  { id: 5, englishName: 'hourglass', koreaName: '모래시계형' },
  { id: 6, englishName: 'trapezoid', koreaName: '사다리꼴형' },
]

const FASHION_STYLES = [
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
