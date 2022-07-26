import { Typography } from '@mui/material'
import SnsPostSearchResultListItem from 'components/search/snsPostSearchResultListItem'
import NoSearchResult from 'components/search/noSearchResult'
import useSnsPosts from 'hooks/useSnsPosts'
import addBackendUrlToImageUrl from 'utils/addBackendUrlToImageUrl'
import createUrlQuery from 'utils/createUrlQuery'
import getFormattedDate from 'utils/getFormattedDate'
import { SnsPostForSearching } from 'types/snsPost'

type SnsPostSearchResultProps = {
  searchKeyword: string
}

const sanitizeSnsPosts = (searchedSnsPostsFromStrapi): SnsPostForSearching[] =>
  searchedSnsPostsFromStrapi.map(searchedSnsPostFromStrapi => {
    const author = searchedSnsPostFromStrapi.attributes.author.data.attributes
    const createdDate = new Date(searchedSnsPostFromStrapi.attributes.createdAt)

    return {
      id: searchedSnsPostFromStrapi.id,
      createdAt: getFormattedDate(createdDate),
      firstImage: {
        url: addBackendUrlToImageUrl(
          searchedSnsPostFromStrapi.attributes.postImages.data[0].attributes.url
        ),
        altText:
          searchedSnsPostFromStrapi.attributes.postImages.data[0].attributes
            .alternativeText,
      },
      content: searchedSnsPostFromStrapi.attributes.content,
      likeNumbers: searchedSnsPostFromStrapi.attributes.likeUsers.data.length,
      author: {
        username: author.username,
        avatarUrl: addBackendUrlToImageUrl(
          author.profileImage.data?.attributes.url
        ),
      },
    }
  })

const SnsPostSearchResult = ({ searchKeyword }: SnsPostSearchResultProps) => {
  const query = createUrlQuery({
    'populate[0]': 'postImages',
    'populate[1]': 'author',
    'populate[2]': 'author.profileImage',
    'populate[3]': 'likeUsers',
    'filters[content][$containsi]': searchKeyword,
    sort: 'createdAt:desc',
  })

  const { snsPosts: searchedSnsPostsFromStrapi, isLoading: isSnsPostsLoading } =
    useSnsPosts(query)

  if (isSnsPostsLoading) {
    return <p>로딩중...</p>
  }

  const searchedSnsPosts = sanitizeSnsPosts(searchedSnsPostsFromStrapi)

  return (
    <section>
      <Typography variant="h4" component="h2">
        SNS 게시물 검색 결과
      </Typography>
      <ul>
        {searchedSnsPosts.length === 0 ? (
          <NoSearchResult />
        ) : (
          searchedSnsPosts.map(snsPost => (
            <SnsPostSearchResultListItem key={snsPost.id} snsPost={snsPost} />
          ))
        )}
      </ul>
    </section>
  )
}

export default SnsPostSearchResult
