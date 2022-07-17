import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import CommentByMode from 'components/sns/comment/commentByMode'
import { horizontal } from 'styles/layout'
import useSnsComments from 'hooks/useSnsComments'
import createUrlQuery from 'utils/createUrlQuery'
import { BACKEND_URL } from 'constants/constants'
import ROUTE_URL from 'constants/routeUrl'

const StyledCommentAuthorWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
`

const PostCommentList = ({ snsPostId }) => {
  const query = createUrlQuery({
    'populate[0]': 'author',
    'populate[1]': 'author.profileImage',
    'filters[post][id][$eq]': `${snsPostId}`,
    sort: 'createdAt:asc',
  })
  const { snsComments: snsCommentsFromStrapi } = useSnsComments(query)

  const comments = snsCommentsFromStrapi.map((snsComment: any) => {
    const author = snsComment.attributes.author.data

    return {
      id: snsComment.id,
      content: snsComment.attributes.content,
      authorId: author.id,
      authorName: author.attributes.username,
      authorProfileImageUrl: author.attributes.profileImage.data
        ? BACKEND_URL + author.attributes.profileImage.data.attributes.url
        : undefined,
    }
  })

  if (comments.length === 0) {
    return <p>댓글이 없습니다. 첫 댓글을 입력해 보세요!</p>
  }

  return (
    <ul>
      {comments.map((comment: any) => (
        <li key={comment.id} css={horizontal}>
          <Link href={`${ROUTE_URL.SNS}/${comment.authorId}`}>
            <StyledCommentAuthorWrapper>
              <Avatar
                alt={comment.authorProfileImageUrl}
                src={comment.authorProfileImageUrl}
                sx={{ width: 30, height: 30, marginRight: 1 }}
              />
              <span>{comment.authorName}</span>
            </StyledCommentAuthorWrapper>
          </Link>
          <CommentByMode
            commentId={comment.id}
            commentText={comment.content}
            snsPostId={snsPostId}
            authorId={comment.authorId}
          />
        </li>
      ))}
    </ul>
  )
}

export default PostCommentList
