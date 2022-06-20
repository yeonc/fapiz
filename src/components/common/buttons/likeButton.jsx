import { useSWRConfig } from 'swr'
import Checkbox from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import likePost from 'services/users/likePost'
import unlikePost from 'services/users/unlikePost'
import createUrlQuery from 'utils/createUrlQuery'

const query = createUrlQuery({
  'populate[0]': 'postImage',
  'populate[1]': 'likeUsers',
  'populate[2]': 'author',
})

const LikeButton = ({ me, targetPost, isShowUsersNum }) => {
  const { mutate } = useSWRConfig()
  const refetch = () => mutate({ url: `/api/sns-posts?${query}` })

  const likeUsers = targetPost.attributes.likeUsers.data
  const isLike = likeUsers.some(likeUser => likeUser.id === me.id)

  const like = async () => {
    await likePost({ snsPostId: targetPost.id, likeUserId: me.id })
  }

  const unlike = async () => {
    const likePostUserIds = likeUsers.map(likeUser => likeUser.id)
    await unlikePost({
      snsPostId: targetPost.id,
      likePostUserIds,
      unlikeUserId: me.id,
    })
  }

  const handleLikeButtonClick = async () => {
    try {
      if (isLike) await unlike()
      if (!isLike) await like()
      refetch()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Checkbox
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        checked={isLike}
        onClick={handleLikeButtonClick}
      />
      {isShowUsersNum && <span>{likeUsers.length}</span>}
    </>
  )
}

export default LikeButton
