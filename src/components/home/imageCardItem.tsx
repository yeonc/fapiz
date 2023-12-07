import { MouseEvent } from 'react'
import { useRouter } from 'next/router'
import { css } from '@emotion/react'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import LikeButtonForHomePage from 'components/home/likeButtonForHomePage'
import { SnsPostForHomePage } from 'pages/api/filtered-sns-posts'

const imageListItemStyle = css`
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
`

const imageListItemBarStyle = css`
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0)
  );
`

type ImageCardItemProps = {
  cardItemData: SnsPostForHomePage
  rightActionButton: EmotionJSX.Element | null
}

const ImageCardItem = ({
  cardItemData,
  rightActionButton,
}: ImageCardItemProps) => {
  const router = useRouter()

  const goToSnsPost = (snsPostId: number) =>
    router.push(`/sns/post/${snsPostId}`)

  const handleImageListItemClick = (e: MouseEvent<HTMLElement>) => {
    const isLikeButtonClicked =
      (e.target as HTMLElement).id === LikeButtonForHomePage.id
    if (isLikeButtonClicked) {
      return
    }

    goToSnsPost(cardItemData.id)
  }

  return (
    <ImageListItem onClick={handleImageListItemClick} css={imageListItemStyle}>
      <img
        src={cardItemData.postImage.url}
        alt={cardItemData.postImage.altText}
      />
      <ImageListItemBar
        title={cardItemData.author.username}
        position="top"
        actionIcon={rightActionButton}
        actionPosition="right"
        css={imageListItemBarStyle}
      />
    </ImageListItem>
  )
}

export default ImageCardItem
