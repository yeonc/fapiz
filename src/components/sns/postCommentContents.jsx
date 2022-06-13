import { useState } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import UserAvatar from 'components/common/images/userAvatar'
import { horizontal } from 'styles/layout'
import useMe from 'hooks/useMe'
import useSnsPost from 'hooks/useSnsPost'
import createComment from 'services/users/createComment'
import createUrlQuery from 'utils/createUrlQuery'

const CommentInputFormWrapper = styled.form`
  display: flex;
  align-items: center;
`

const PostCommentInputForm = ({ snsPostId }) => {
  const [comment, setComment] = useState('')
  const { me, error } = useMe()

  const loading = !me && !error

  if (loading) {
    return <p>로딩중...</p>
  }

  if (error) {
    return <p>에러가 발생했습니다. 홈으로 돌아가세요</p>
  }

  const handleChange = e => {
    setComment(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await createComment({ comment, postId: snsPostId, authorId: me.id })
    } catch (error) {
      console.error(error)
    } finally {
      setComment('')
    }
  }

  return (
    <CommentInputFormWrapper onSubmit={handleSubmit}>
      <UserAvatar
        profileImageUrl={me.profileImage.url}
        username={me.username}
        styleConfig={{ width: 30, height: 30, marginRight: 1 }}
      />
      <TextField
        label="댓글을 입력하세요"
        variant="standard"
        value={comment}
        onChange={handleChange}
        required
      />
      <Button variant="contained" size="small" type="submit">
        등록
      </Button>
    </CommentInputFormWrapper>
  )
}

const PostCommentList = ({ comments }) => (
  <ul>
    {comments &&
      comments.map(comment => (
        <li key={comment.id} css={horizontal}>
          <UserAvatar
            profileImageUrl={comment.profileImageUrl}
            username={comment.author}
            styleConfig={{ width: 30, height: 30, marginRight: 1 }}
          />
          <span>{comment.author}</span>
          <p>{comment.content}</p>
          <IconButton aria-label="댓글 수정">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="댓글 삭제">
            <DeleteIcon />
          </IconButton>
        </li>
      ))}
  </ul>
)

const query = createUrlQuery({
  'populate[0]': 'comments.author',
  'populate[1]': 'comments.author.profileImage',
})

const PostCommentContents = () => {
  const router = useRouter()
  const { snsPostId } = router.query

  const { snsPost } = useSnsPost(snsPostId, query)

  const commentsFromStrapiDB = snsPost && snsPost.data.attributes.comments.data

  const comments =
    commentsFromStrapiDB &&
    commentsFromStrapiDB.map(comment => ({
      id: comment.id,
      author: comment.attributes.author.data.attributes.username,
      content: comment.attributes.content,
      profileImageUrl:
        comment.attributes.author.data.attributes.profileImage.data.attributes
          .url,
    }))

  return (
    <>
      <PostCommentInputForm snsPostId={snsPostId} />
      <PostCommentList comments={comments} />
    </>
  )
}

export default PostCommentContents
