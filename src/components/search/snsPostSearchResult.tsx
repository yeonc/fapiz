import styled from '@emotion/styled'
import SnsPostSearchResultListItem from 'components/search/snsPostSearchResultListItem'
import SnsPostSearchResultListItemSkeleton from 'components/search/snsPostSearchResultListItemSkeleton'
import NoSearchResult from 'components/search/noSearchResult'
import SearchResultHeadingTypo from 'components/search/searchResultHeadingTypo'
import useSnsPosts from 'hooks/useSnsPosts'
import createUrlQuery from 'utils/createUrlQuery'
import getFormattedDate from 'utils/getFormattedDate'
import { SnsPostForSearching } from 'types/snsPost'
import { HOVER_BACKGROUND_GRAY } from 'styles/constants/color'

const SNS_POST_SEARCH_RESULT_COUNT_TO_BE_SHOWED = 5

const StyledSnsPostSearchResultListItem = styled(SnsPostSearchResultListItem)`
  padding: 10px 14px;
  margin-bottom: 20px;

  &:hover {
    background-color: ${HOVER_BACKGROUND_GRAY};
  }
`

const StyledSnsPostSearchResultListItemSkeleton = styled(
  SnsPostSearchResultListItemSkeleton
)`
  padding: 10px 14px;
  margin-bottom: 20px;
`

type SnsPostSearchResultProps = {
  searchKeyword: string
}

const SnsPostSearchResult = ({ searchKeyword }: SnsPostSearchResultProps) => {
  const query = createUrlQuery({
    'populate[0]': 'postImages',
    'populate[1]': 'author',
    'populate[2]': 'author.profileImage',
    'populate[3]': 'likeUsers',
    'populate[4]': 'comments',
    'filters[content][$containsi]': searchKeyword,
    sort: 'createdAt:desc',
  })

  const { snsPosts: searchedSnsPostsFromStrapi, isLoading: isSnsPostsLoading } =
    useSnsPosts(query)

  const searchedSnsPosts = isSnsPostsLoading
    ? null
    : sanitizeSnsPosts(searchedSnsPostsFromStrapi)

  const searchedSnsPostsToBeShowed = searchedSnsPosts?.slice(
    0,
    SNS_POST_SEARCH_RESULT_COUNT_TO_BE_SHOWED
  )

  return (
    <section>
      <SearchResultHeadingTypo>SNS 게시물 검색 결과</SearchResultHeadingTypo>
      {searchedSnsPostsToBeShowed ? (
        <>
          {searchedSnsPostsToBeShowed.length === 0 && <NoSearchResult />}
          <ul>
            {searchedSnsPostsToBeShowed.map(snsPost => (
              <StyledSnsPostSearchResultListItem
                key={snsPost.id}
                snsPost={snsPost}
              />
            ))}
          </ul>
        </>
      ) : (
        <ul>
          <StyledSnsPostSearchResultListItemSkeleton />
          <StyledSnsPostSearchResultListItemSkeleton />
        </ul>
      )}
    </section>
  )
}

export default SnsPostSearchResult

const sanitizeSnsPosts = (searchedSnsPostsFromStrapi): SnsPostForSearching[] =>
  searchedSnsPostsFromStrapi.map(searchedSnsPostFromStrapi => {
    const author = searchedSnsPostFromStrapi.attributes.author.data.attributes
    const createdDate = new Date(searchedSnsPostFromStrapi.attributes.createdAt)

    return {
      id: searchedSnsPostFromStrapi.id,
      createdAt: getFormattedDate(createdDate),
      firstImage: {
        url: searchedSnsPostFromStrapi.attributes.postImages.data[0].attributes
          .url,
        altText:
          searchedSnsPostFromStrapi.attributes.postImages.data[0].attributes
            .alternativeText,
      },
      content: searchedSnsPostFromStrapi.attributes.content,
      likeNumbers: searchedSnsPostFromStrapi.attributes.likeUsers.data.length,
      author: {
        username: author.username,
        avatarUrl: author.profileImage.data?.attributes.url,
      },
      commentCount: searchedSnsPostFromStrapi.attributes.comments.data.length,
    }
  })
