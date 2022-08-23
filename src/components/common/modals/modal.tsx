import styled from '@emotion/styled'
import MUIModal from '@mui/material/Modal'
import Typo from 'components/common/typo'
import { DEFAULT_WHITE } from 'styles/constants/color'

const StyledModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 20px;
  background-color: ${DEFAULT_WHITE};
`

const StyledModalContentsWrapper = styled.div`
  max-height: 200px;
  overflow: auto;
`

type ModalProps = {
  title: string
  contents: any
  open: boolean
  onClose: () => void
  className?: string
}

const Modal = ({ title, contents, open, onClose, className }: ModalProps) => {
  return (
    <MUIModal open={open} onClose={onClose}>
      <StyledModalBox className={className}>
        <Typo variant="h6" component="h2">
          {title}
        </Typo>
        <StyledModalContentsWrapper>{contents}</StyledModalContentsWrapper>
      </StyledModalBox>
    </MUIModal>
  )
}

export default Modal
