import { useRouter } from 'next/router'
import PostDescriptionContentsLayout from 'components/sns/post/postDescriptionContentsLayout'
import PostCommentList from 'components/sns/comment/postCommentList'
import useSnsPost from 'hooks/useSnsPost'
import createUrlQuery from 'utils/createUrlQuery'
import { SnsPostResponseAboutPostDetail } from 'types/snsPost'
import getSafeNumberFromQuery from 'utils/getSafeNumberFromQuery'
import { sanitizeSnsPostForPostDetail } from 'sanitizer/snsPosts'

const queryForFetchingSnsPost = createUrlQuery({
  'populate[0]': 'author.profileImage',
  'populate[1]': 'likeUsers',
  'populate[2]': 'bookmarkUsers',
  'populate[3]': 'postImages',
})

const SnsPostPageWithoutLogin = () => {
  const router = useRouter()
  const { snsPostId: snsPostIdFromQuery } = router.query
  const snsPostId = snsPostIdFromQuery
    ? getSafeNumberFromQuery(snsPostIdFromQuery)
    : undefined
  const { snsPost: snsPostFromStrapi, error } =
    useSnsPost<SnsPostResponseAboutPostDetail>(
      snsPostId || undefined,
      queryForFetchingSnsPost
    )

  if (!snsPostFromStrapi) {
    return null
  }

  if (error) {
    return <p>페이지를 표시할 수 없습니다.</p>
  }

  const snsPost = sanitizeSnsPostForPostDetail(snsPostFromStrapi)

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
        postFashionItemInfos={snsPost.fashionItemInfos}
      />
      <PostCommentList snsPostId={snsPost.id} />
    </>
  )
}

export default SnsPostPageWithoutLogin
