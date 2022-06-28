import { useSWRConfig } from 'swr'
import { css } from '@emotion/react'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import Modal from 'components/modals/modal'
import FashionItemEditForm from 'components/closet/fashionItemEditForm'
import useMe from 'hooks/useMe'
import useModalState from 'hooks/useModalState'
import createUrlQuery from 'utils/createUrlQuery'

const fashionItemEditButtonStyle = css`
  position: absolute;
  right: 2px;
  bottom: 8px;
`

const FashionItemEditingArea = ({ initialFashionItem }) => {
  const { me } = useMe()

  const query = createUrlQuery({
    'populate[0]': 'image',
    'populate[1]': 'owner',
    'filters[owner][id][$eq]': me && me.id,
    sort: 'createdAt:desc',
  })

  const {
    isOpen: isFashionItemEditModalOpen,
    handleOpen: handleFashionItemEditModalOpen,
    handleClose: handleFashionItemEditModalClose,
  } = useModalState()

  const { mutate } = useSWRConfig()
  const refetch = () => mutate({ url: `/api/fashion-items?${query}` })

  const afterEditFashionItem = () => {
    handleFashionItemEditModalClose()
    refetch()
  }

  const afterDeleteFashionItem = () => {
    handleFashionItemEditModalClose()
    refetch()
  }

  return (
    <>
      <IconButton
        color="primary"
        aria-label="패션 아이템 편집"
        css={fashionItemEditButtonStyle}
        onClick={handleFashionItemEditModalOpen}
      >
        <EditIcon />
      </IconButton>
      <Modal
        title="패션 아이템 편집"
        contents={
          <FashionItemEditForm
            initialFashionItem={initialFashionItem}
            afterEditFashionItem={afterEditFashionItem}
            afterDeleteFashionItem={afterDeleteFashionItem}
          />
        }
        open={isFashionItemEditModalOpen}
        onClose={handleFashionItemEditModalClose}
      />
    </>
  )
}

export default FashionItemEditingArea
