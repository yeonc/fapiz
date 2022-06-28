import { useSWRConfig } from 'swr'
import { css } from '@emotion/react'
import Fab from '@mui/material/Fab'
import CheckroomIcon from '@mui/icons-material/Checkroom'
import Modal from 'components/modals/modal'
import FashionItemCreateForm from 'components/closet/fashionItemCreateForm'
import useMe from 'hooks/useMe'
import useModalState from 'hooks/useModalState'
import createUrlQuery from 'utils/createUrlQuery'

const FabPositionFixed = css`
  position: fixed;
  right: 20px;
  bottom: 20px;
`

const FashionItemCreatingArea = () => {
  const { me } = useMe()

  const query = createUrlQuery({
    'populate[0]': 'image',
    'populate[1]': 'owner',
    'filters[owner][id][$eq]': me && me.id,
    sort: 'createdAt:desc',
  })

  const {
    isOpen: isFashionItemCreateModalOpen,
    handleOpen: handleFashionItemCreateModalOpen,
    handleClose: handleFashionItemCreateModalClose,
  } = useModalState()

  const { mutate } = useSWRConfig()
  const refetch = () => mutate({ url: `/api/fashion-items?${query}` })

  const afterCreateFashionItem = () => {
    handleFashionItemCreateModalClose()
    refetch()
  }

  return (
    <>
      <Fab
        color="primary"
        aria-label="옷장에 패션 아이템 등록"
        css={FabPositionFixed}
        onClick={handleFashionItemCreateModalOpen}
      >
        <CheckroomIcon />
      </Fab>
      <Modal
        title="패션 아이템 추가"
        contents={
          <FashionItemCreateForm
            afterCreateFashionItem={afterCreateFashionItem}
          />
        }
        open={isFashionItemCreateModalOpen}
        onClose={handleFashionItemCreateModalClose}
      />
    </>
  )
}

export default FashionItemCreatingArea
