import { useState } from 'react'
import withHeader from 'hocs/withHeader'
import { css } from '@emotion/react'
import Fab from '@mui/material/Fab'
import CheckroomIcon from '@mui/icons-material/Checkroom'
import FashionItemList from 'components/closet/fashionItemList'
import ButtonGroupsForFilteringFashionItems from 'components/closet/buttonGroupsForFilteringFashionItems'
import FashionItemCreatingModal from 'components/closet/fashionItemCreatingModal'
import LoginPageRedirect from 'components/common/redirect/loginPageRedirect'
import useMe from 'hooks/useMe'
import useFashionItems from 'hooks/useFashionItems'
import useModalState from 'hooks/useModalState'
import createUrlQuery from 'utils/createUrlQuery'
import addBackendUrlToImageUrl from 'utils/addBackendUrlToImageUrl'

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

  const { me, isLoading } = useMe()

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
      url: addBackendUrlToImageUrl(
        fashionItem.attributes.image.data.attributes.url
      ),
      altText: fashionItem.attributes.image.data.attributes.alternativeText,
    },
  }))

  const fashionItemsToShowed =
    filteredFashionItems === [] ? fashionItems : filteredFashionItems

  // TODO: 로그인 상태에서는 화면 잘 나오는데 로그아웃했을 땐 로딩중 문구 떠있는 문제 해결하기
  if (isLoading) {
    return <p>로딩중...</p>
  }

  return (
    <>
      {me ? (
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
      ) : (
        <LoginPageRedirect />
      )}
    </>
  )
}

export default withHeader(ClosetPage)
