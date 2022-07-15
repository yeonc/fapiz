import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'
import withLogin from 'hocs/withLogin'
import { css } from '@emotion/react'
import PopoverMenu from 'components/common/menus/popoverMenu'
import BookmarkButton from 'components/common/buttons/bookmarkButton'
import LikeButton from 'components/common/buttons/likeButton'
import PostAuthorHeader from 'components/sns/postAuthorHeader'
import useSnsPost from 'hooks/useSnsPost'
import useMe from 'hooks/useMe'
import createUrlQuery from 'utils/createUrlQuery'
import getFormattedDate from 'utils/getFormattedDate'
import { BACKEND_URL } from 'constants/constants'

const snsPostImagesStyle = css`
  width: 200px;
`

const query = createUrlQuery({
  'populate[0]': 'author.profileImage',
  'populate[1]': 'likeUsers',
  'populate[2]': 'bookmarkUsers',
  'populate[3]': 'postImages',
})

const PostDescriptionContents = () => {
  const router = useRouter()
  const { snsPostId } = router.query

  const { mutate } = useSWRConfig()

  const LikeButtonWithLogin = withLogin(LikeButton)
  const BookmarkButtonWithLogin = withLogin(BookmarkButton)

  const { me } = useMe()

  const {
    snsPost: snsPostFromStrapi,
    isLoading,
    error,
  } = useSnsPost(snsPostId, query)

  if (isLoading) {
    return <p>로딩중..</p>
  }

  if (error) {
    return <p>페이지를 표시할 수 없습니다.</p>
  }

  const snsPost = {
    id: snsPostFromStrapi.id,
    createdAt: snsPostFromStrapi.attributes.createdAt,
    images: snsPostFromStrapi.attributes.postImages.data.map((image: any) => ({
      url: BACKEND_URL + image.attributes.url,
      altText: image.attributes.alternativeText,
    })),
    author: {
      id: snsPostFromStrapi.attributes.author.data.id,
      username: snsPostFromStrapi.attributes.author.data.attributes.username,
      height: snsPostFromStrapi.attributes.author.data.attributes.height,
      weight: snsPostFromStrapi.attributes.author.data.attributes.weight,
      avatarUrl:
        snsPostFromStrapi.attributes.author.data.attributes.profileImage.data
          .attributes.url,
    },
    likeUsers: snsPostFromStrapi.attributes.likeUsers.data,
    bookmarkUsers: snsPostFromStrapi.attributes.bookmarkUsers.data,
    content: snsPostFromStrapi.attributes.content,
    fashionItemsInfo: snsPostFromStrapi.attributes.fashionItemsInfo,
  }

  const createdDate = new Date(snsPost.createdAt)
  const dateFormat = getFormattedDate(createdDate)

  const refetch = () => mutate({ url: `/api/sns-posts/${snsPost.id}?${query}` })

  const afterBookmark = () => {
    refetch()
  }

  const afterLike = () => {
    refetch()
  }

  return (
    <>
      <PostAuthorHeader
        author={snsPost.author}
        popoverMenu={<PopoverMenu postId={snsPostId} myId={me?.id} />}
      />
      {snsPost.images.map(snsPostImage => (
        <img
          css={snsPostImagesStyle}
          key={snsPostImage.url}
          src={snsPostImage.url}
          alt={snsPostImage.altText}
        />
      ))}
      <div>
        <LikeButtonWithLogin
          myId={me?.id}
          targetId={snsPost.id}
          likeUsers={snsPost.likeUsers}
          afterLike={afterLike}
          isShowLikeUsersNumber={true}
        />

        <BookmarkButtonWithLogin
          myId={me?.id}
          targetId={snsPost.id}
          bookmarkUsers={snsPost.bookmarkUsers}
          afterBookmark={afterBookmark}
          isShowBookmarkUsersNumber={true}
        />
      </div>
      <p>{snsPost.content}</p>
      <span>{dateFormat}</span>
      {snsPost.fashionItemsInfo && (
        <>
          <h3>착용한 제품 정보</h3>
          <ul>
            {snsPost.fashionItemsInfo?.map(
              (fashionItemInfo: any, index: number) => (
                <li key={index.toString()}>
                  {`${fashionItemInfo.category}: ${fashionItemInfo.price}원 / ${fashionItemInfo.buyingPlace}`}
                </li>
              )
            )}
          </ul>
        </>
      )}
    </>
  )
}

export default PostDescriptionContents
