import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'
import styled from '@emotion/styled'
import PostDescriptionContentsLayout from 'components/sns/post/postDescriptionContentsLayout'
import PostCommentWritingArea from 'components/sns/comment/postCommentWritingArea'
import PostCommentList from 'components/sns/comment/postCommentList'
import PopoverMenu from 'components/common/menus/popoverMenu'
import LikeButton from 'components/common/buttons/likeButton'
import useMe from 'hooks/useMe'
import useSnsPost from 'hooks/useSnsPost'
import createUrlQuery from 'utils/createUrlQuery'

const StyledPostCommentWritingArea = styled(PostCommentWritingArea)`
  margin-bottom: 12px;
`

const queryForFetchingSnsPost = createUrlQuery({
  'populate[0]': 'author.profileImage',
  'populate[1]': 'likeUsers',
  'populate[2]': 'bookmarkUsers',
  'populate[3]': 'postImages',
})

const MySnsPostPage = () => {
  const router = useRouter()
  const { snsPostId } = router.query

  const { me } = useMe()

  const {
    snsPost: snsPostFromStrapi,
    isLoading,
    error,
  } = useSnsPost(Number(snsPostId), queryForFetchingSnsPost)

  const { mutate } = useSWRConfig()

  const queryForFetchingSnsComments = createUrlQuery({
    'populate[0]': 'author',
    'populate[1]': 'author.profileImage',
    'filters[post][id][$eq]': `${snsPostId}`,
    sort: 'createdAt:desc',
  })

  if (isLoading) {
    return null
  }

  if (error) {
    return <p>페이지를 표시할 수 없습니다.</p>
  }

  const snsPost = {
    id: snsPostFromStrapi.id,
    createdAt: snsPostFromStrapi.attributes.createdAt,
    images: snsPostFromStrapi.attributes.postImages.data.map((image: any) => ({
      url: image.attributes.url,
      altText: image.attributes.alternativeText,
    })),
    author: {
      id: snsPostFromStrapi.attributes.author.data.id,
      username: snsPostFromStrapi.attributes.author.data.attributes.username,
      height: snsPostFromStrapi.attributes.author.data.attributes.height,
      weight: snsPostFromStrapi.attributes.author.data.attributes.weight,
      avatarUrl:
        snsPostFromStrapi.attributes.author.data.attributes.profileImage.data
          ?.attributes.url,
    },
    likeUsers: snsPostFromStrapi.attributes.likeUsers.data,
    bookmarkUsers: snsPostFromStrapi.attributes.bookmarkUsers.data,
    content: snsPostFromStrapi.attributes.content ?? '',
    fashionItemsInfo: snsPostFromStrapi.attributes.fashionItemsInfo,
  }

  const refetchSnsPost = () =>
    mutate({ url: `/api/sns-posts/${snsPost.id}?${queryForFetchingSnsPost}` })

  const afterLike = () => {
    refetchSnsPost()
  }

  const refetchPostComments = () => {
    mutate({ url: `/api/sns-comments?${queryForFetchingSnsComments}` })
  }

  const afterPostCommentSubmit = () => {
    refetchPostComments()
  }

  return (
    <>
      <PostDescriptionContentsLayout
        snsPostEditMenu={<PopoverMenu postId={snsPost.id} myId={me?.id} />}
        likeButton={
          <LikeButton
            myId={me?.id}
            targetId={snsPost.id}
            likeUsers={snsPost.likeUsers}
            afterLike={afterLike}
            isShowLikeUsersNumber={true}
          />
        }
        bookmarkButton={null}
        postCreatedDate={snsPost.createdAt}
        postAuthor={snsPost.author}
        postImages={snsPost.images}
        postContent={snsPost.content}
        postFashionItemInfos={snsPost.fashionItemsInfo}
      />
      <StyledPostCommentWritingArea
        snsPostId={snsPost.id}
        afterPostCommentSubmit={afterPostCommentSubmit}
      />
      <PostCommentList snsPostId={snsPost.id} />
    </>
  )
}

export default MySnsPostPage
