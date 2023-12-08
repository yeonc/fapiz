import { useRouter } from 'next/router'
import { css } from '@emotion/react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import useSnsPosts from 'hooks/useSnsPosts'
import createUrlQuery from 'utils/createUrlQuery'
import { SnsPostResponseAboutShowingAll } from 'types/snsPost'
import { Image } from 'types/image'
import { sanitizeSnsPostsForShowingAllSnsPosts } from 'sanitizer/snsPosts'
import { Id } from 'types/common'

export type SnsPostForSnsPosts = {
  id: Id
  firstImage: Image
}

const cursorPointer = css`
  cursor: pointer;
`

const postImageStyle = css`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`

const SnsPosts = ({ userId }: { userId: Id }) => {
  const router = useRouter()
  const query = createUrlQuery({
    populate: '*',
    'filters[author][id][$eq]': userId,
    sort: 'createdAt:desc',
  })
  const { snsPosts: snsPostsFromStrapi, isLoading } =
    useSnsPosts<SnsPostResponseAboutShowingAll[]>(query)

  const snsPosts = snsPostsFromStrapi
    ? sanitizeSnsPostsForShowingAllSnsPosts(snsPostsFromStrapi)
    : []

  const goToSnsPost = (postId: Id) => router.push(`/sns/post/${postId}`)

  if (isLoading) {
    return <p>포스트 데이터를 불러오는 중입니다.</p>
  }

  if (snsPosts.length === 0) {
    return <p>작성된 포스트가 없습니다.</p>
  }

  return (
    <ImageList cols={3}>
      {snsPosts.map(snsPost => (
        <ImageListItem
          key={snsPost.firstImage.url}
          onClick={() => goToSnsPost(snsPost.id)}
          css={cursorPointer}
        >
          <img
            src={snsPost.firstImage.url}
            alt={snsPost.firstImage.altText}
            css={postImageStyle}
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default SnsPosts
