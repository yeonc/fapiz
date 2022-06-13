import { useRouter } from 'next/router'
import useSWR from 'swr'
import PostImages from 'components/sns/postImages'
import { BACKEND_URL } from 'constants/constants'
import PostAuthorHeader from 'components/sns/postAuthorHeader'
import ButtonsForLikeAndBookmark from 'components/sns/buttonsForLikeAndBookmark'

const fetcher = url => axios.get(url).then(res => res.data)

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
      {fashionItems.map(item => (
        <li key={item.id}>
          {item.itemType}: {item.itemPrice}원 / {item.itemPlace}
        </li>
      ))}
    </ul>
  </>
)

const PostDescriptionContents = () => {
  const router = useRouter()
  const { snsPostId } = router.query

  const { data: response, error } = useSWR(
    snsPostId && `${BACKEND_URL}/api/sns-posts/${snsPostId}`,
    fetcher
  )
  const loading = !response && !error

  if (loading) {
    return <p>로딩중...</p>
  }

  if (error) {
    return <p>에러가 발생했습니다. 홈으로 돌아가세요</p>
  }

  const snsPost = response.data

  return (
    <>
      <PostAuthorHeader />
      <PostImages />
      <ButtonsForLikeAndBookmark likeCountNum={123} />
      <PostText text={snsPost.attributes.content} createdDate="3일 전" />
      <PostFashionItemInfo
        fashionItems={[
          {
            id: 1,
            itemType: '상의',
            itemPrice: 150000,
            itemPlace: '무신사',
          },
          {
            id: 2,
            itemType: '하의',
            itemPrice: 52000,
            itemPlace: '핫핑',
          },
        ]}
      />
    </>
  )
}

export default PostDescriptionContents
