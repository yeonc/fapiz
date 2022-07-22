import { Typography } from '@mui/material'
import SnsPostSearchResultListItem from 'components/search/snsPostSearchResultListItem'
import NoSearchResult from 'components/search/noSearchResult'
import useSnsPosts from 'hooks/useSnsPosts'
import addBackendUrlToImageUrl from 'utils/addBackendUrlToImageUrl'
import createUrlQuery from 'utils/createUrlQuery'
import getFormattedDate from 'utils/getFormattedDate'
import createSearchKeywordsArray from 'utils/createSearchKeywordsArray'

type FilterSnsPostArgs = {
  initialSnsPosts: any
  searchKeywordRegex: RegExp
}

type FilterSnsPost = (args: FilterSnsPostArgs) => any

const filterSnsPost: FilterSnsPost = ({
  initialSnsPosts,
  searchKeywordRegex,
}) => {
  const filteredSnsPosts = initialSnsPosts.filter((snsPost: any) => {
    if (!snsPost.content) {
      return
    }

    const snsPostContent = snsPost.content.toLowerCase().trim()
    return snsPostContent.match(searchKeywordRegex)
  })

  return filteredSnsPosts
}

type SearchSnsPostArgs = {
  searchKeyword: string
  initialSnsPosts: any
}

type SearchSnsPost = (args: SearchSnsPostArgs) => any

const searchSnsPost: SearchSnsPost = ({ searchKeyword, initialSnsPosts }) => {
  const searchKeywords = createSearchKeywordsArray(searchKeyword)
  const searchKeywordRegex = new RegExp(searchKeywords.join('|'), 'gi')
  const filteredSnsPosts = filterSnsPost({
    initialSnsPosts,
    searchKeywordRegex,
  })
  return filteredSnsPosts
}

const query = createUrlQuery({
  'populate[0]': 'postImages',
  'populate[1]': 'author',
  'populate[2]': 'author.profileImage',
  'populate[3]': 'likeUsers',
  sort: 'createdAt:desc',
})

type SnsPostSearchResultProps = {
  searchKeyword: string
}

const SnsPostSearchResult = ({ searchKeyword }: SnsPostSearchResultProps) => {
  const { snsPosts: snsPostsFromStrapi, isLoading: isSnsPostsLoading } =
    useSnsPosts(query)

  if (isSnsPostsLoading) {
    return <p>로딩중...</p>
  }

  const snsPosts = snsPostsFromStrapi.map((snsPostFromStrapi: any) => {
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

  console.log(snsPostsFromStrapi)

  const searchedSnsPosts = searchSnsPost({
    searchKeyword,
    initialSnsPosts: snsPosts,
  })

  return (
    <section>
      <Typography variant="h4" component="h2">
        SNS 게시물 검색 결과
      </Typography>
      <ul>
        {searchedSnsPosts.length === 0 ? (
          <NoSearchResult />
        ) : (
          searchedSnsPosts.map((snsPost: any) => (
            <SnsPostSearchResultListItem key={snsPost.id} snsPost={snsPost} />
          ))
        )}
      </ul>
    </section>
  )
}

export default SnsPostSearchResult
