import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import CommentByMode from 'components/sns/comment/commentByMode'
import { horizontal } from 'styles/layout'
import useSnsComments from 'hooks/useSnsComments'
import createUrlQuery from 'utils/createUrlQuery'
import { BACKEND_URL } from 'constants/constants'
import ROUTE_URL from 'constants/routeUrl'

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
    isAuthorNotExist: snsComment.attributes.author.data.attributes.isHidden,
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
      {comments.length === 0 ? (
        <p>댓글이 없습니다. 첫 댓글을 입력해 보세요!</p>
      ) : (
        comments.map((comment: any) => (
          <li key={comment.id} css={horizontal}>
            <Link href={`${ROUTE_URL.SNS}/${comment.authorId}`}>
              <Avatar
                alt={comment.authorProfileImageUrl}
                src={comment.authorProfileImageUrl}
                sx={{ width: 30, height: 30, marginRight: 1 }}
              />
            </Link>
            <Link href={`${ROUTE_URL.SNS}/${comment.authorId}`}>
              <span>
                {comment.isAuthorNotExist ? '탈퇴한 유저' : comment.author}
              </span>
            </Link>
            <CommentByMode
              commentId={comment.id}
              commentText={comment.content}
              snsPostId={snsPostId}
              authorId={comment.authorId}
            />
          </li>
        ))
      )}
    </ul>
  )
}

export default PostCommentList
