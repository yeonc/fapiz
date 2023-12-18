import { PostCommentForSnsPost } from 'components/sns/comment/postCommentList'
import { PostCommentResponse } from 'types/postComment'

export const sanitizePostCommentsForSnsPost = (
  comments: PostCommentResponse[]
): PostCommentForSnsPost[] =>
  comments.map(comment => {
    const author = comment.attributes.author.data
    return {
      id: comment.id,
      createdAt: comment.attributes.createdAt,
      content: comment.attributes.content,
      authorId: author?.id || null,
      authorName: author?.attributes.username || null,
      authorProfileImageUrl:
        author?.attributes.profileImage.data?.attributes.url,
    }
  })
