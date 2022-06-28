import withHeader from 'hocs/withHeader'
import FashionItemsList from 'components/closet/fashionItemsList'
import ButtonGroupsForFilteringFashionItems from 'components/closet/buttonGroupsForFilteringFashionItems'
import FashionItemCreatingArea from 'components/closet/fashionItemCreatingArea'

const ClosetPage = () => {
  return (
    <>
      <ButtonGroupsForFilteringFashionItems />
      <FashionItemsList />
      <FashionItemCreatingArea />
    </>
  )
}

export default withHeader(ClosetPage)
