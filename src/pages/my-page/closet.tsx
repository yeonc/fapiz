import { useState } from 'react'
import withHeader from 'hocs/withHeader'
import { css } from '@emotion/react'
import Fab from '@mui/material/Fab'
import CheckroomIcon from '@mui/icons-material/Checkroom'
import FashionItemList from 'components/closet/fashionItemList'
import ButtonGroupsForFilteringFashionItems from 'components/closet/buttonGroupsForFilteringFashionItems'
import FashionItemCreatingModal from 'components/closet/fashionItemCreatingModal'
import useMe from 'hooks/useMe'
import useFashionItems from 'hooks/useFashionItems'
import useModalState from 'hooks/useModalState'
import createUrlQuery from 'utils/createUrlQuery'
import { BACKEND_URL } from 'constants/constants'

const fabPositionFixed = css`
  position: fixed;
  right: 20px;
  bottom: 20px;
`

const ClosetPage = () => {
  const [filteredFashionItems, setfilteredFashionItems] = useState([])
  const {
    isOpen: isFashionItemCreateModalOpen,
    handleOpen: handleFashionItemCreateModalOpen,
    handleClose: handleFashionItemCreateModalClose,
  } = useModalState()

  const afterFashionItemsFiltered = (filteredFashionItems: any) => {
    setfilteredFashionItems(filteredFashionItems)
  }

  const { me } = useMe()

  const query = createUrlQuery({
    'populate[0]': 'image',
    'populate[1]': 'owner',
    'filters[owner][id][$eq]': me && me.id,
    sort: 'createdAt:desc',
  })

  const { fashionItems: fashionItemsFromStrapi } = useFashionItems(query)

  const fashionItems = fashionItemsFromStrapi.map((fashionItem: any) => ({
    id: fashionItem.id,
    season: fashionItem.attributes.season,
    category: fashionItem.attributes.category,
    color: fashionItem.attributes.color,
    image: {
      url: BACKEND_URL + fashionItem.attributes.image.data.attributes.url,
      altText: fashionItem.attributes.image.data.attributes.alternativeText,
    },
  }))

  const fashionItemsToShowed =
    filteredFashionItems === [] ? fashionItems : filteredFashionItems

  return (
    <>
      <ButtonGroupsForFilteringFashionItems
        fashionItemsToFiltered={fashionItems}
        afterFashionItemsFiltered={afterFashionItemsFiltered}
      />
      <FashionItemList fashionItems={fashionItemsToShowed} />
      <Fab
        color="primary"
        aria-label="옷장에 패션 아이템 등록"
        css={fabPositionFixed}
        onClick={handleFashionItemCreateModalOpen}
      >
        <CheckroomIcon />
      </Fab>
      <FashionItemCreatingModal
        isFashionItemCreateModalOpen={isFashionItemCreateModalOpen}
        onFashionItemCreateModalClose={handleFashionItemCreateModalClose}
      />
    </>
  )
}

export default withHeader(ClosetPage)
