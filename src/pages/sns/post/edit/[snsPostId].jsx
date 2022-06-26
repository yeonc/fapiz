import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'
import withHeader from 'hocs/withHeader'
import Button from '@mui/material/Button'
import PostEditForm from 'components/sns/edit/postEditForm'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import PostImages from 'components/sns/edit/postImages'
import FashionItemsInfo from 'components/sns/edit/fashionItemsInfo'
import PostText from 'components/sns/edit/postText'
import useSnsPost from 'hooks/useSnsPost'
import { BACKEND_URL } from 'constants/constants'
import createUrlQuery from 'utils/createUrlQuery'
import generateIdToObject from 'utils/generateIdToObject'

const EMPTY_FASHION_ITEM_INFO = { category: '', price: '', buyingPlace: '' }

const query = createUrlQuery({
  populate: '*',
})

const SnsPostEditPage = () => {
  const { mutate } = useSWRConfig()

  const router = useRouter()
  const { snsPostId } = router.query

  const { snsPost } = useSnsPost(snsPostId)

  useEffect(() => {
    setPreviewImages(initialPreviewImages)
    setPostText(initialPostText)
    setFashionItemsInfo(initialFashionItemsInfo)
  }, [snsPost])

  const initialPreviewImages = snsPost
    ? snsPost.attributes.postImages.data.map(image => ({
        url: BACKEND_URL + image.attributes.url,
        altText: image.attributes.alternativeText,
      }))
    : []
  const newEmptyFashionItemInfo = generateIdToObject(EMPTY_FASHION_ITEM_INFO)
  const initialFashionItemsInfo =
    snsPost && snsPost.attributes.fashionItemsInfo
      ? snsPost.attributes.fashionItemsInfo
      : [].concat(newEmptyFashionItemInfo)
  const initialPostText = snsPost ? snsPost.attributes.content : ''

  const [imageFiles, setImageFiles] = useState(null)
  const [previewImages, setPreviewImages] = useState(initialPreviewImages)
  const [fashionItemsInfo, setFashionItemsInfo] = useState(
    initialFashionItemsInfo
  )
  const [postText, setPostText] = useState(initialPostText)

  const setPostPreviewImages = imageFiles => {
    const previewImages = [...imageFiles].map(imageFile => ({
      url: URL.createObjectURL(imageFile),
      altText: imageFile.name,
    }))
    setPreviewImages(previewImages)
  }

  const afterImageFilesChange = () => {
    mutate({ url: `/api/sns-posts/${snsPostId}?${query}` })
  }

  const handleImageFilesChange = imageFiles => {
    setImageFiles(imageFiles)
    setPostPreviewImages(imageFiles)
    afterImageFilesChange()
  }

  const handlePreviewImagesChange = previewImages => {
    setPreviewImages(previewImages)
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
        onPreviewImagesChange={handlePreviewImagesChange}
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
