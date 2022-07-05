import { useState } from 'react'
import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import Button from '@mui/material/Button'
import PostEditForm from 'components/sns/edit/postEditForm'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import PostImages from 'components/sns/edit/postImages'
import FashionItemsInfo from 'components/sns/edit/fashionItemsInfo'
import PostText from 'components/sns/edit/postText'
import useSnsPost from 'hooks/useSnsPost'
import { BACKEND_URL } from 'constants/constants'
import generateIdToObject from 'utils/generateIdToObject'
import { changeImageFilesToPreviewImages } from 'utils/previewImage'

const EMPTY_FASHION_ITEM_INFO = { category: '', price: '', buyingPlace: '' }

const SnsPostEditPage = () => {
  const router = useRouter()
  const { snsPostId } = router.query

  const { snsPost, isLoading: isSnsPostLoading } = useSnsPost(snsPostId)

  const initialPreviewImages = snsPost
    ? snsPost.attributes.postImages.data.map(image => ({
        url: BACKEND_URL + image.attributes.url,
        altText: image.attributes.alternativeText,
      }))
    : []
  const newEmptyFashionItemInfo = generateIdToObject(EMPTY_FASHION_ITEM_INFO)
  const initialFashionItemsInfo =
    snsPost && snsPost.attributes.fashionItemsInfo
      ? snsPost.attributes.fashionIemsInfo
      : [newEmptyFashionItemInfo]
  const initialPostText = snsPost ? snsPost.attributes.content : ''

  const [imageFiles, setImageFiles] = useState(null)
  const [previewImages, setPreviewImages] = useState(initialPreviewImages)
  const [fashionItemsInfo, setFashionItemsInfo] = useState(
    initialFashionItemsInfo
  )
  const [postText, setPostText] = useState(initialPostText)

  const handleImageFilesChange = imageFiles => {
    setImageFiles(imageFiles)
    const previewImagesFromImageFiles =
      changeImageFilesToPreviewImages(imageFiles)
    setPreviewImages(previewImagesFromImageFiles)
  }

  const handleFashionItemsInfoChange = fashionItemsInfo => {
    setFashionItemsInfo(fashionItemsInfo)
  }

  const handleFashionItemInfoAddMoreButtonClick = () => {
    setFashionItemsInfo(prev => {
      const newEmptyFashionItemInfo = generateIdToObject(
        EMPTY_FASHION_ITEM_INFO
      )
      return prev.concat(newEmptyFashionItemInfo)
    })
  }

  const handleFashionItemInfoDeleteButtonClick = fashionItemInfoIdToDelete => {
    setFashionItemsInfo(prev => {
      return prev.filter(prev => prev.id !== fashionItemInfoIdToDelete)
    })
  }

  const handlePostTextChange = postText => {
    setPostText(postText)
  }

  const afterEditPost = () => {
    router.push(`/sns/post/${snsPostId}`)
  }

  if (isSnsPostLoading) {
    return <p>SNS post 정보를 불러오는 중입니다.</p>
  }

  return (
    <PostEditForm
      snsPostId={snsPostId}
      imageFiles={imageFiles}
      fashionItemsInfo={fashionItemsInfo}
      postText={postText}
      afterEditPost={afterEditPost}
    >
      <PostImages
        imageFiles={imageFiles}
        previewImages={previewImages}
        onImageFilesChange={handleImageFilesChange}
        imageUploadButton={
          <ImageUploadButton
            onImageFilesChange={handleImageFilesChange}
            buttonAriaLabel="SNS 게시물 이미지 수정"
          />
        }
      />
      <FashionItemsInfo
        fashionItemsInfo={fashionItemsInfo}
        onFashionItemsInfoChange={handleFashionItemsInfoChange}
        onFashionItemInfoAddMoreButtonClick={
          handleFashionItemInfoAddMoreButtonClick
        }
        onFashionItemInfoDeleteButtonClick={
          handleFashionItemInfoDeleteButtonClick
        }
      />
      <PostText postText={postText} onPostTextChange={handlePostTextChange} />
      <Button variant="contained" type="submit">
        수정
      </Button>
    </PostEditForm>
  )
}

export default withHeader(SnsPostEditPage)
