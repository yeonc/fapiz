import { useSWRConfig } from 'swr'
import Modal from 'components/modals/modal'
import FashionItemEditForm from 'components/closet/fashionItemEditForm'
import useMe from 'hooks/useMe'
import createUrlQuery from 'utils/createUrlQuery'

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
      onClose={onFashionItemEditModalClose}
    />
  )
}

export default FashionItemEditingModal
