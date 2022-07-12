import { useRouter } from 'next/router'
import SnsPostList from '@mui/material/ImageList'
import SnsPostItem from '@mui/material/ImageListItem'
import { css } from '@emotion/react'
import useSnsPosts from 'hooks/useSnsPosts'
import createUrlQuery from 'utils/createUrlQuery'
import { BACKEND_URL } from 'constants/constants'

export const cursorPointer = css`
  cursor: pointer;
`

const SnsPosts = ({ userId }) => {
  const router = useRouter()

  const query = createUrlQuery({
    populate: '*',
    'filters[author][id][$eq]': userId,
  })

  const { snsPosts, isLoading } = useSnsPosts(query)

  if (isLoading) {
    return <p>게시물을 불러오는 중입니다...</p>
  }

  const sanitizedSnsPosts = snsPosts.map(post => {
    const postId = post.id
    const postImageArray = post.attributes.postImages.data
    const postImages = postImageArray
      ? postImageArray.map(postImage => postImage.attributes)
      : []

    return {
      postId,
      postImages,
    }
  })

  return sanitizedSnsPosts.length === 0 ? (
    <p>작성된 포스트가 없습니다.</p>
  ) : (
    <SnsPostList sx={{ width: 650 }} cols={3}>
      {sanitizedSnsPosts.map(post => {
        const firstImage = post.postImages[0]
        const firstImageUrl = firstImage && BACKEND_URL + firstImage.url
        const goToSnsPost = () => {
          router.push(`/sns/post/${post.postId}`)
        }

        return (
          <SnsPostItem
            key={firstImageUrl}
            onClick={goToSnsPost}
            css={cursorPointer}
          >
            <img
              src={`${firstImageUrl}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${firstImageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={firstImage && firstImage.alternativeText}
              loading="lazy"
            />
          </SnsPostItem>
        )
      })}
    </SnsPostList>
  )
}

export default SnsPosts
