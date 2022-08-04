import { css } from '@emotion/react'
import PostAuthorHeader from 'components/sns/post/postAuthorHeader'
import getFormattedDate from 'utils/getFormattedDate'

const snsPostImagesStyle = css`
  width: 200px;
`

const PostDescriptionContentsLayout = ({
  snsPostEditMenu,
  likeButton,
  bookmarkButton,
  postCreatedDate,
  postAuthor,
  postImages,
  postContent,
  postFashionItemsInfo,
}) => {
  const createdDate = new Date(postCreatedDate)
  const dateFormat = getFormattedDate(createdDate)

  return (
    <>
      <PostAuthorHeader author={postAuthor} popoverMenu={snsPostEditMenu} />
      {postImages.map(postImage => (
        <img
          css={snsPostImagesStyle}
          key={postImage.url}
          src={postImage.url}
          alt={postImage.altText}
        />
      ))}
      <div>
        {likeButton}
        {bookmarkButton}
      </div>
      <p>{postContent}</p>
      <span>{dateFormat}</span>
      {postFashionItemsInfo && (
        <>
          <h3>착용한 제품 정보</h3>
          <ul>
            {postFashionItemsInfo.map((fashionItemInfo: any, index: number) => (
              <li key={index.toString()}>
                {`${fashionItemInfo.category}: ${fashionItemInfo.price}원 / ${fashionItemInfo.buyingPlace}`}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default PostDescriptionContentsLayout
