import { useRouter } from 'next/router'
import PostDescriptionContentsLayout from 'components/sns/post/postDescriptionContentsLayout'
import PostCommentList from 'components/sns/comment/postCommentList'
import useSnsPost from 'hooks/useSnsPost'
import createUrlQuery from 'utils/createUrlQuery'
import {
  SnsPostForPostDetail,
  SnsPostResponseAboutPostDetail,
} from 'types/snsPost'

const queryForFetchingSnsPost = createUrlQuery({
  'populate[0]': 'author.profileImage',
  'populate[1]': 'likeUsers',
  'populate[2]': 'bookmarkUsers',
  'populate[3]': 'postImages',
})

const SnsPostPageWithoutLogin = () => {
  const router = useRouter()
  const { snsPostId } = router.query
  const { snsPost: snsPostFromStrapi, error } =
    useSnsPost<SnsPostResponseAboutPostDetail>(
      parseInt(snsPostId as string),
      queryForFetchingSnsPost
    )

  if (!snsPostFromStrapi) {
    return null
  }

  if (error) {
    return <p>페이지를 표시할 수 없습니다.</p>
  }

  const snsPost: SnsPostForPostDetail = {
    id: snsPostFromStrapi.id,
    createdAt: snsPostFromStrapi.attributes.createdAt,
    images: snsPostFromStrapi.attributes.postImages.data.map(image => ({
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
    fashionItemsInfo: snsPostFromStrapi.attributes.fashionItemsInfo ?? [],
  }

  return (
    <>
      <PostDescriptionContentsLayout
        snsPostEditMenu={null}
        likeButton={null}
        bookmarkButton={null}
        postCreatedDate={snsPost.createdAt}
        postAuthor={snsPost.author}
        postImages={snsPost.images}
        postContent={snsPost.content}
        postFashionItemInfos={snsPost.fashionItemsInfo}
      />
      <PostCommentList snsPostId={snsPost.id} />
    </>
  )
}

export default SnsPostPageWithoutLogin
