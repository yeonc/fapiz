import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'
import PostImages from 'components/sns/postImages'
import PostAuthorHeader from 'components/sns/postAuthorHeader'
import PopoverMenu from 'components/common/menus/popoverMenu'
import LikeButton from 'components/common/buttons/likeButton'
import BookmarkButton from 'components/common/buttons/bookmarkButton'
import useSnsPost from 'hooks/useSnsPost'
import useMe from 'hooks/useMe'
import createUrlQuery from 'utils/createUrlQuery'
import getFormattedDate from 'utils/getFormattedDate'

const queryForFetchingSnsPostByPostId = createUrlQuery({
  'populate[0]': 'author.profileImage',
  'populate[1]': 'likeUsers',
  'populate[2]': 'bookmarkUsers',
  'populate[3]': 'postImages',
})
const mutateKeyForFetchingSnsPostByPostId = (postId: any) => ({
  url: `/api/sns-posts/${postId}?${queryForFetchingSnsPostByPostId}`,
})

const queryForFetchingSnsPosts = createUrlQuery({
  'populate[0]': 'postImages',
  'populate[1]': 'likeUsers',
  'populate[2]': 'author',
})
const mutateKeyForFetchingSnsPosts = {
  url: `/api/sns-posts?${queryForFetchingSnsPosts}`,
}

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
      {fashionItems?.map((item: any, index: any) => (
        <li key={index.toString()}>
          {item.category}: {item.price}원 / {item.buyingPlace}
        </li>
      ))}
    </ul>
  </>
)

const PostDescriptionContents = () => {
  const router = useRouter()
  const { snsPostId } = router.query

  const {
    snsPost: snsPostFromStrapi,
    isLoading,
    error,
  } = useSnsPost(snsPostId, queryForFetchingSnsPostByPostId)

  const { me } = useMe()

  if (isLoading) {
    return <p>로딩중..</p>
  }

  if (error) {
    return <p>페이지를 표시할 수 없습니다.</p>
  }

  const snsPost = snsPostFromStrapi.attributes
  const snsPostImagesFromStrapi = snsPost.postImages.data
  const snsPostImages = snsPostImagesFromStrapi
    ? snsPostImagesFromStrapi.map((image: any) => ({
        id: image.id,
        altText: image.attributes.alternativeText,
        url: image.attributes.url,
      }))
    : []

  const author = snsPost.author.data.attributes
  const userInfo = {
    username: author.username,
    height: author.height,
    weight: author.weight,
    avatarUrl: author.profileImage.data.attributes.url,
  }

  const createdDate = new Date(snsPost.createdAt)
  const dateFormat = getFormattedDate(createdDate)

  const { mutate } = useSWRConfig()

  const afterBookmark = () => {
    mutate(mutateKeyForFetchingSnsPostByPostId(snsPost.id))
  }

  const afterLike = () => {
    mutate(mutateKeyForFetchingSnsPosts)
  }

  return (
    <>
      <PostAuthorHeader
        author={userInfo}
        popoverMenu={<PopoverMenu postId={snsPostId} myId={me && me.id} />}
      />
      {snsPostImagesFromStrapi && <PostImages images={snsPostImages} />}
      {!!me ? (
        <LikeButton
          myId={me.id}
          targetForLike={snsPost}
          afterLike={afterLike}
          isShowLikeUsersNumber={true}
        />
      ) : null}
      {!!me ? (
        <BookmarkButton
          myId={me.id}
          targetForBookmark={snsPost}
          afterBookmark={afterBookmark}
          isShowBookmarkUsersNumber={true}
        />
      ) : null}
      <PostText text={snsPost.content} createdDate={dateFormat} />
      {snsPost.fashionItemsInfo && (
        <PostFashionItemInfo fashionItems={snsPost.fashionItemsInfo} />
      )}
    </>
  )
}

export default PostDescriptionContents
