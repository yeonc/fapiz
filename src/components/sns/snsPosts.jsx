import { useRouter } from 'next/router'
import SnsPostList from '@mui/material/ImageList'
import SnsPostItem from '@mui/material/ImageListItem'
import { css } from '@emotion/react'
import useSnsPosts from 'hooks/useSnsPosts'
import { BACKEND_URL } from 'constants/constants'

export const cursorPointer = css`
  cursor: pointer;
`

const SnsPosts = ({ userId }) => {
  const router = useRouter()
  const { snsPosts, error, isLoading } = useSnsPosts(userId)

  if (isLoading) {
    return <p>로딩중...</p>
  }

  if (error) {
    return <p>에러가 발생했습니다. 홈으로 돌아가세요</p>
  }

  const sanitizedSnsPosts = snsPosts.data.map(post => {
    const postId = post.id
    const postImageArray = post.attributes.postImage.data
    const postImages = postImageArray.map(postImage => postImage.attributes)

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
        const firstImageUrl = BACKEND_URL + firstImage.url
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
              alt={firstImage.alternativeText}
              loading="lazy"
            />
          </SnsPostItem>
        )
      })}
    </SnsPostList>
  )
}

export default SnsPosts
