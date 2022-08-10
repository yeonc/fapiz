import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import CommentByMode from 'components/sns/comment/commentByMode'
import { horizontal } from 'styles/layout'
import useSnsComments from 'hooks/useSnsComments'
import createUrlQuery from 'utils/createUrlQuery'
import addBackendUrlToImageUrl from 'utils/addBackendUrlToImageUrl'
import ROUTE_URL from 'constants/routeUrl'
import { PostCommentForSnsPostPage } from 'types/postComment'

const StyledCommentAuthorWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
`

type PostCommentListProps = {
  snsPostId: number
}

const PostCommentList = ({ snsPostId }: PostCommentListProps) => {
  const query = createUrlQuery({
    'populate[0]': 'author',
    'populate[1]': 'author.profileImage',
    'filters[post][id][$eq]': `${snsPostId}`,
    sort: 'createdAt:asc',
  })

  const { snsComments: snsCommentsFromStrapi } = useSnsComments(query)

  const comments: PostCommentForSnsPostPage[] = snsCommentsFromStrapi.map(
    (snsComment: any) => {
      const author = snsComment.attributes.author.data

      return {
        id: snsComment.id,
        content: snsComment.attributes.content,
        authorId: author.id,
        authorName: author.attributes.username,
        authorProfileImageUrl: addBackendUrlToImageUrl(
          author.attributes.profileImage.data?.attributes.url
        ),
      }
    }
  )

  if (comments.length === 0) {
    return <p>댓글이 없습니다. 첫 댓글을 입력해 보세요!</p>
  }

  return (
    <ul>
      {comments.map(comment => (
        <li key={comment.id} css={horizontal}>
          <Link href={`${ROUTE_URL.SNS}/${comment.authorId}`}>
            <StyledCommentAuthorWrapper>
              <Avatar
                alt={comment.authorName}
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
            commentAuthorId={comment.authorId}
          />
        </li>
      ))}
    </ul>
  )
}

export default PostCommentList
