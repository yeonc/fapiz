import { useState } from 'react'
import { useSWRConfig } from 'swr'
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
import editUserDetailInfo from 'services/users/editUserDetailInfo'
import useModalState from 'hooks/useModalState'
import useMe from 'hooks/useMe'
import { BACKEND_URL, IS_SERVER } from 'constants/constants'

const UserDetailInfoForm = ({
  userId,
  prevGender,
  prevFashionStyles,
  prevBodyShape,
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

  const [fashionStyles, setFashionStyles] = useState(prevFashionStyles)
  const [gender, setGender] = useState(prevGender)
  const [bodyShape, setBodyShape] = useState(prevBodyShape)

  const handleGenderChange = gender => {
    setGender(gender)
  }

  const handleBodyShapeChange = bodyShape => {
    setBodyShape(bodyShape)
  }

  const handleFashionStyleChange = fashionStyle => e => {
    if (e.target.checked === true) {
      fashionStyles.push(fashionStyle)
      setFashionStyles([...fashionStyles])
      console.log(fashionStyles)
    }

    if (e.target.checked === false) {
      const checkedFashionStyles = fashionStyles.filter(
        style => style.name !== fashionStyle.name
      )
      console.log(checkedFashionStyles)
      setFashionStyles([...checkedFashionStyles])
      console.log(fashionStyles) // 다시 살펴볼 것! 왜 출력될 때 아이템이 빠지지 않은 상태인지
    }
  }

  const editDetailInfo = async () => {
    await editUserDetailInfo({ userId, gender, bodyShape, fashionStyles })
  }

  const afterEditDetailInfo = () => {
    onModalClose()
    refetch()
  }

  const handleUserInfoSubmit = async e => {
    e.preventDefault()

    try {
      await editDetailInfo()
      afterEditDetailInfo()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleUserInfoSubmit}>
      <FormControl>
        <FormLabel>성별</FormLabel>
        <RadioGroup
          row
          name="gender"
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
          name="body-shape"
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
          {FASHION_STYLE_LIST.map(fashionStyleItem => (
            <FormControlLabel
              key={fashionStyleItem.id}
              value={fashionStyleItem.name}
              control={
                <Checkbox
                  checked={
                    fashionStyles.findIndex(
                      fashionStyle => fashionStyle.id === fashionStyleItem.id
                    ) >= 0
                  }
                  onClick={handleFashionStyleChange({
                    id: fashionStyleItem.id,
                    name: fashionStyleItem.name,
                  })}
                />
              }
              label={fashionStyleItem.name}
            />
          ))}
        </FormGroup>
        <FormHelperText>3개까지 선택 가능</FormHelperText>
      </FormControl>
      {buttonInModal}
    </form>
  )
}

const UserDetailInfoControlButtonAndModal = ({ button, modal }) => {
  return (
    <>
      {button}
      {modal}
    </>
  )
}

const UserDetailInformationGetArea = () => {
  const { me } = useMe()

  const {
    isOpen: isUserDetailInfoModalOpen,
    handleOpen: handleUserDetailInfoModalOpen,
    handleClose: handleUserDetailInfoModalClose,
  } = useModalState()

  return (
    <>
      <p>상세 정보를 입력하고 나와 같은 스타일의 유저들을 만나보세요!</p>
      <UserDetailInfoControlButtonAndModal
        button={
          <Button varient="contained" onClick={handleUserDetailInfoModalOpen}>
            상세 정보 입력하러 가기
          </Button>
        }
        modal={
          <Modal
            title="상세 정보 입력하기"
            contents={
              <UserDetailInfoForm
                userId={me.id}
                buttonInModal={
                  <Button variant="contained" type="submit">
                    등록
                  </Button>
                }
                onModalClose={handleUserDetailInfoModalClose}
              />
            }
            open={isUserDetailInfoModalOpen}
            onClose={handleUserDetailInfoModalClose}
          />
        }
      />
    </>
  )
}

const UserDetailInformationShowAndEditArea = ({ data }) => {
  const { me } = useMe()

  const {
    isOpen: isUserDetailInfoModalOpen,
    handleOpen: handleUserDetailInfoModalOpen,
    handleClose: handleUserDetailInfoModalClose,
  } = useModalState()

  return (
    <>
      <dl>
        <div>
          <dt>성별</dt>
          <dd>{data.gender}</dd>
        </div>
        <div>
          <dt>옷 스타일</dt>
          <dd>
            {data.fashionStyles.map(fashionStyle => `${fashionStyle.name} `)}
          </dd>
        </div>
        <div>
          <dt>체형</dt>
          <dd>{data.bodyShape}</dd>
        </div>
      </dl>
      <UserDetailInfoControlButtonAndModal
        button={
          <Button varient="contained" onClick={handleUserDetailInfoModalOpen}>
            상세 정보 수정
          </Button>
        }
        modal={
          <Modal
            title="상세 정보 수정하기"
            contents={
              <UserDetailInfoForm
                userId={me.id}
                prevGender={data.gender}
                prevFashionStyles={data.fashionStyles}
                prevBodyShape={data.bodyShape}
                buttonInModal={
                  <Button variant="contained" type="submit">
                    수정
                  </Button>
                }
                onModalClose={handleUserDetailInfoModalClose}
              />
            }
            open={isUserDetailInfoModalOpen}
            onClose={handleUserDetailInfoModalClose}
          />
        }
      />
    </>
  )
}

const UserDetailInfo = () => {
  const { me } = useMe()

  console.log(me)

  const NOT_INFOMATION_TEXT =
    '정보가 없습니다. 상세 정보 수정 버튼을 눌러 정보를 입력해 보세요!'

  const detailInfo = {
    gender: me.gender ? me.gender : NOT_INFOMATION_TEXT,
    fashionStyles: me.fashionStyles ? me.fashionStyles : NOT_INFOMATION_TEXT,
    bodyShape: me.bodyShape ? me.bodyShape : NOT_INFOMATION_TEXT,
  }

  return (
    <>
      {me.gender || me.fashionStyle || me.bodyShape ? (
        // 유저의 상세 정보(성별, 옷 스타일, 체형) 데이터가 하나라도 있다면 렌더링 될 컴포넌트
        <UserDetailInformationShowAndEditArea data={detailInfo} />
      ) : (
        // 유저의 상세 정보(성별, 옷 스타일, 체형) 데이터가 하나도 없다면 렌더링 될 컴포넌트
        <UserDetailInformationGetArea />
      )}
    </>
  )
}

export default UserDetailInfo

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
