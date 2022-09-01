import styled from '@emotion/styled'
import CheckroomIcon from '@mui/icons-material/Checkroom'
import Button from '@mui/material/Button'
import FashionItemCreatingModal from 'components/closet/fashionItemCreatingModal'
import Typo from 'components/common/typo'
import useModalState from 'hooks/useModalState'
import { mgBottom } from 'styles/layout'

const StyledClosetImage = styled.div`
  width: 100%;
  margin-bottom: 30px;
  aspect-ratio: 16 / 8;
  background-image: url('/closet.png');
  background-position: center center;
  background-size: cover;
  color: #fff;
`

const StyledClosetImageOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`

const StyledTextPosition = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const IntroducingBanner = () => {
  const {
    isOpen: isFashionItemCreateModalOpen,
    handleOpen: handleFashionItemCreateModalOpen,
    handleClose: handleFashionItemCreateModalClose,
  } = useModalState()

  return (
    <StyledClosetImage>
      <StyledClosetImageOverlay>
        <StyledTextPosition>
          <Typo variant="h4" component="h1" css={mgBottom(10)}>
            온라인 옷장
          </Typo>
          <Typo css={mgBottom(24)}>
            소장하고 있는 패션 아이템을 온라인 옷장에서 관리해 보세요!
          </Typo>
          <Button
            variant="contained"
            startIcon={<CheckroomIcon />}
            onClick={handleFashionItemCreateModalOpen}
          >
            옷장에 패션 아이템 등록하기
          </Button>
          <FashionItemCreatingModal
            isFashionItemCreateModalOpen={isFashionItemCreateModalOpen}
            onFashionItemCreateModalClose={handleFashionItemCreateModalClose}
          />
        </StyledTextPosition>
      </StyledClosetImageOverlay>
    </StyledClosetImage>
  )
}

export default IntroducingBanner
