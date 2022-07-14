import Avatar from '@mui/material/Avatar'
import CommentByMode from 'components/sns/comment/commentByMode'
import { horizontal } from 'styles/layout'
import useSnsComments from 'hooks/useSnsComments'
import createUrlQuery from 'utils/createUrlQuery'
import { BACKEND_URL } from 'constants/constants'

const PostCommentList = ({ snsPostId }) => {
  const query = createUrlQuery({
    'populate[0]': 'author',
    'populate[1]': 'author.profileImage',
    'filters[post][id][$eq]': `${snsPostId}`,
    sort: 'createdAt:asc',
  })
  const { snsComments: snsCommentsFromStrapi } = useSnsComments(query)

  const comments = snsCommentsFromStrapi.map((snsComment: any) => ({
    id: snsComment.id,
    content: snsComment.attributes.content,
    author: snsComment.attributes.author.data.attributes.username,
    authorId: snsComment.attributes.author.data.id,
    authorProfileImageUrl: snsComment.attributes.author.data.attributes
      .profileImage.data
      ? BACKEND_URL +
        snsComment.attributes.author.data.attributes.profileImage.data
          .attributes.url
      : undefined,
  }))

  return (
    <ul>
      {comments.map((comment: any) => (
        <li key={comment.id} css={horizontal}>
          <Avatar
            alt={comment.authorProfileImageUrl}
            src={comment.authorProfileImageUrl}
            sx={{ width: 30, height: 30, marginRight: 1 }}
          />
          <span>{comment.author}</span>
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
