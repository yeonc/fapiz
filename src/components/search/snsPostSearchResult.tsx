import { Typography } from '@mui/material'
import SnsPostSearchResultListItem from 'components/search/snsPostSearchResultListItem'

const SnsPostSearchResult = () => (
  <section>
    <Typography variant="h4" component="h2">
      SNS 게시물 검색 결과
    </Typography>
    <ul>
      <SnsPostSearchResultListItem />
      <SnsPostSearchResultListItem />
      <SnsPostSearchResultListItem />
    </ul>
  </section>
)

export default SnsPostSearchResult
