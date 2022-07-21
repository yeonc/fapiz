import { Typography } from '@mui/material'
import SnsPostSearchResultListItem from 'components/search/snsPostSearchResultListItem'
import useSnsPosts from 'hooks/useSnsPosts'
import addBackendUrlToImageUrl from 'utils/addBackendUrlToImageUrl'
import createUrlQuery from 'utils/createUrlQuery'
import getFormattedDate from 'utils/getFormattedDate'

const query = createUrlQuery({
  'populate[0]': 'postImages',
  'populate[1]': 'author',
  'populate[2]': 'author.profileImage',
  'populate[3]': 'comments',
  'populate[4]': 'likeUsers',
})

const SnsPostSearchResult = ({ searchKeyword }) => {
  const { snsPosts: snsPostsFromStrapi, isLoading: isSnsPostsLoading } =
    useSnsPosts(query)

  if (isSnsPostsLoading) {
    return <p>로딩중...</p>
  }

  const snsPosts = snsPostsFromStrapi.map(snsPostFromStrapi => {
    const author = snsPostFromStrapi.attributes.author.data.attributes
    const createdDate = new Date(snsPostFromStrapi.attributes.createdAt)

    return {
      id: snsPostFromStrapi.id,
      createdAt: getFormattedDate(createdDate),
      firstImage: {
        url: addBackendUrlToImageUrl(
          snsPostFromStrapi.attributes.postImages.data[0].attributes.url
        ),
        altText:
          snsPostFromStrapi.attributes.postImages.data[0].attributes
            .alternativeText,
      },
      content: snsPostFromStrapi.attributes.content,
      likeNumbers: snsPostFromStrapi.attributes.likeUsers.data.length,
      author: {
        username: author.username,
        avatarUrl: addBackendUrlToImageUrl(
          author.profileImage.data?.attributes.url
        ),
      },
    }
  })

  return (
    <section>
      <Typography variant="h4" component="h2">
        SNS 게시물 검색 결과
      </Typography>
      <ul>
        {snsPosts.map(snsPost => (
          <SnsPostSearchResultListItem key={snsPost.id} snsPost={snsPost} />
        ))}
      </ul>
    </section>
  )
}

export default SnsPostSearchResult
