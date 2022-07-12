import { useSWRConfig } from 'swr'
import Modal from 'components/modals/modal'
import FashionItemCreateForm from 'components/closet/fashionItemCreateForm'
import useMe from 'hooks/useMe'
import createUrlQuery from 'utils/createUrlQuery'

const FashionItemCreatingModal = ({
  isFashionItemCreateModalOpen,
  onFashionItemCreateModalClose,
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

  const afterCreateFashionItem = () => {
    onFashionItemCreateModalClose()
    refetch()
  }

  return (
    <Modal
      title="패션 아이템 추가"
      contents={
        <FashionItemCreateForm
          afterCreateFashionItem={afterCreateFashionItem}
        />
      }
      open={isFashionItemCreateModalOpen}
      onClose={onFashionItemCreateModalClose}
    />
  )
}

export default FashionItemCreatingModal
