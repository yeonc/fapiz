import { useState } from 'react'

const useModalState = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return { isOpen, handleOpen, handleClose }
}

export default useModalState
