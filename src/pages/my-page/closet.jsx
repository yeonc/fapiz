import withHeader from 'hocs/withHeader'
import FashionItemsList from 'components/closet/fashionItemsList'
import ButtonGroupsForFilteringFashionItems from 'components/closet/buttonGroupsForFilteringFashionItems'
import FashionItemAddingArea from 'components/closet/fashionItemAddingArea'

const ClosetPage = () => {
  return (
    <>
      <ButtonGroupsForFilteringFashionItems />
      <FashionItemsList />
      <FashionItemAddingArea />
    </>
  )
}

export default withHeader(ClosetPage)
