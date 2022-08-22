import MUIModal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typo from 'components/common/typo'

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const Modal = ({ title, contents, open, onClose }) => {
  return (
    <MUIModal open={open} onClose={onClose}>
      <Box sx={modalBoxStyle}>
        <Typo variant="h6" component="h2">
          {title}
        </Typo>
        {contents}
      </Box>
    </MUIModal>
  )
}

export default Modal
