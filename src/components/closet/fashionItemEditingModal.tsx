import { useSWRConfig } from 'swr'
import styled from '@emotion/styled'
import Modal from 'components/common/modals/modal'
import FashionItemEditForm from 'components/closet/fashionItemEditForm'
import useMe from 'hooks/useMe'
import createUrlQuery from 'utils/createUrlQuery'

const StyledModal = styled(Modal)`
  border-radius: 10px;
`

const FashionItemEditingModal = ({
  onFashionItemEditModalClose,
  isFashionItemEditModalOpen,
  initialFashionItem,
}) => {
  const { me } = useMe()

  const query = createUrlQuery({
    'populate[0]': 'image',
    'populate[1]': 'owner',
    'filters[owner][id][$eq]': me && me.id,
    sort: 'createdAt:desc',
  })

  const { mutate } = useSWRConfig()
  const refetch = () => mutate({ url: `/api/fashion-items?${query}` })

  const afterEditFashionItem = () => {
    onFashionItemEditModalClose()
    refetch()
  }

  const afterDeleteFashionItem = () => {
    onFashionItemEditModalClose()
    refetch()
  }

  return (
    <StyledModal
      title="패션 아이템 편집"
      contents={
        <FashionItemEditForm
          initialFashionItem={initialFashionItem}
          afterEditFashionItem={afterEditFashionItem}
          afterDeleteFashionItem={afterDeleteFashionItem}
        />
      }
      open={isFashionItemEditModalOpen}
      onClose={onFashionItemEditModalClose}
    />
  )
}

export default FashionItemEditingModal
