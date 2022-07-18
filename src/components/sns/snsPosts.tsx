import { useRouter } from 'next/router'
import { css } from '@emotion/react'
import SnsPostList from '@mui/material/ImageList'
import SnsPostItem from '@mui/material/ImageListItem'
import useSnsPosts from 'hooks/useSnsPosts'
import createUrlQuery from 'utils/createUrlQuery'
import addBackendUrlToImageUrl from 'utils/addBackendUrlToImageUrl'

export const cursorPointer = css`
  cursor: pointer;
`

const SnsPosts = ({ userId }) => {
  const router = useRouter()

  const query = createUrlQuery({
    populate: '*',
    'filters[author][id][$eq]': userId,
  })

  const { snsPosts: snsPostsFromStrapi, isLoading } = useSnsPosts(query)

  if (isLoading) {
    return <p>게시물을 불러오는 중입니다...</p>
  }

  const snsPosts = snsPostsFromStrapi.map((post: any) => ({
    id: post.id,
    firstImage: {
      url: addBackendUrlToImageUrl(
        post.attributes.postImages.data[0].attributes.url
      ),
      altText: post.attributes.postImages.data[0].attributes.alternativeText,
    },
  }))

  const goToSnsPost = postId => {
    router.push(`/sns/post/${postId}`)
  }

  if (snsPosts.length === 0) {
    return <p>작성된 포스트가 없습니다.</p>
  }

  return (
    <SnsPostList sx={{ width: 650 }} cols={3}>
      {snsPosts.map((snsPost: any) => (
        <SnsPostItem
          key={snsPost.firstImage.url}
          onClick={() => goToSnsPost(snsPost.id)}
          css={cursorPointer}
        >
          <img src={snsPost.firstImage.url} alt={snsPost.firstImage.altText} />
        </SnsPostItem>
      ))}
    </SnsPostList>
  )
}

export default SnsPosts
