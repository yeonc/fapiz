import { useRouter } from 'next/router'
import PostImages from 'components/sns/postImages'
import PostAuthorHeader from 'components/sns/postAuthorHeader'
import ButtonsForLikeAndBookmark from 'components/sns/buttonsForLikeAndBookmark'
import PopoverMenu from 'components/common/menus/popoverMenu'
import useSnsPost from 'hooks/useSnsPost'
import useMe from 'hooks/useMe'
import createUrlQuery from 'utils/createUrlQuery'
import getDateFormat from 'utils/getDateFormat'

const PostText = ({ text, createdDate }) => (
  <>
    <p>{text}</p>
    <span>{createdDate}</span>
  </>
)

const PostFashionItemInfo = ({ fashionItems }) => (
  <>
    <h3>착용한 제품 정보</h3>
    <ul>
      {fashionItems?.map(item => (
        <li key={item.itemPrice}>
          {item.itemType}: {item.itemPrice}원 / {item.itemPlace}
        </li>
      ))}
    </ul>
  </>
)

const query = createUrlQuery({
  'populate[0]': 'author.profileImage',
  'populate[1]': 'likeUsers',
  'populate[2]': 'bookmarkUsers',
  'populate[3]': 'postImage',
})

const PostDescriptionContents = () => {
  const router = useRouter()
  const { snsPostId } = router.query

  const {
    snsPost: snsPostFromStrapi,
    isLoading,
    error,
  } = useSnsPost(snsPostId, query)

  const { me } = useMe()

  if (isLoading) {
    return <p>로딩중..</p>
  }

  if (error) {
    return <p>페이지를 표시할 수 없습니다.</p>
  }

  const snsPost = snsPostFromStrapi.attributes

  const snsPostImages = snsPost.postImage.data.map(image => ({
    id: image.id,
    altText: image.attributes.alternativeText,
    url: image.attributes.url,
  }))

  const author = snsPost.author.data.attributes
  const userInfo = {
    username: author.username,
    height: author.height,
    weight: author.weight,
    avatarUrl: author.profileImage.data.attributes.url,
  }

  const createdDate = new Date(snsPost.createdAt)
  const dateFormat = getDateFormat(createdDate)

  return (
    <>
      <PostAuthorHeader
        author={userInfo}
        popoverMenu={<PopoverMenu postId={snsPostId} myId={me.id} />}
      <ButtonsForLikeAndBookmark
        likeCountNum={snsPost.likeUsers.data.length}
        snsPostId={snsPostId}
        targetUserId={me && me.id}
        myId={me && me.id}
        likeUsers={snsPost.likeUsers.data}
        bookmarkUsers={snsPost.bookmarkUsers.data}
      />
      <PostImages images={snsPostImages} />
      <ButtonsForLikeAndBookmark likeCountNum={snsPost.likeUsers.data.length} />
      <PostText text={snsPost.content} createdDate={dateFormat} />
      {snsPost.itemInformation && (
        <PostFashionItemInfo fashionItems={snsPost.itemInformation} />
      )}
    </>
  )
}

export default PostDescriptionContents
