import { useRouter } from 'next/router'
import { css } from '@emotion/react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import useSnsPosts from 'hooks/useSnsPosts'
import createUrlQuery from 'utils/createUrlQuery'
import { SnsPostForSnsPostsPage } from 'types/snsPost'

const cursorPointer = css`
  cursor: pointer;
`

const postImageStyle = css`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`

const SnsPosts = ({ userId }) => {
  const router = useRouter()

  const query = createUrlQuery({
    populate: '*',
    'filters[author][id][$eq]': userId,
    sort: 'createdAt:desc',
  })

  const { snsPosts: snsPostsFromStrapi, isLoading } = useSnsPosts(query)

  if (isLoading) {
    return null
  }

  const snsPosts: SnsPostForSnsPostsPage[] = snsPostsFromStrapi.map(
    (post: any) => ({
      id: post.id,
      firstImage: {
        url: post.attributes.postImages.data[0].attributes.url,
        altText: post.attributes.postImages.data[0].attributes.alternativeText,
      },
    })
  )

  const goToSnsPost = (postId: number) => {
    router.push(`/sns/post/${postId}`)
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
