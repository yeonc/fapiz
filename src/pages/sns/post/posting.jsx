import { useState } from 'react'
import { useRouter } from 'next/router'
import withHeader from 'hocs/withHeader'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import ItemInfomation from 'components/sns/itemInformation'
import createPost from 'services/users/createPost'
import uploadImage from 'services/users/uploadImage'
import useMe from 'hooks/useMe'

const SnsPostPostingPage = () => {
  const [postText, setPostText] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPriceChange] = useState('')
  const [buyingPlace, setBuyingPlace] = useState('')

  const [imageFiles, setImageFiles] = useState('')

  const fashionItemsInfo = [
    { itemType: category, itemPrice: price, itemPlace: buyingPlace },
  ]

  const { me } = useMe()

  const router = useRouter()

  const handleCategoryChange = category => {
    setCategory(category)
  }

  const handlePriceChange = price => {
    setPriceChange(price)
  }

  const handleBuyingPlaceChange = buyingPlace => {
    setBuyingPlace(buyingPlace)
  }

  const handlePostTextChange = postText => {
    setPostText(postText)
  }

  const handleImageFilesChange = imageFiles => {
    setImageFiles(imageFiles)
  }

  const handlePostingSubmit = async e => {
    e.preventDefault()

    const createSnsPost = async responseAfterUploadImage => {
      const postImageIds = responseAfterUploadImage.data.map(res => res.id)
      const responseAfterCreatePost = await createPost({
        postText,
        fashionItemsInfo,
        authorId: me.id,
        postImageIds,
      })

      return responseAfterCreatePost.data.data.id
    }

    const goToCreatedSnsPost = postId => {
      router.push(`/sns/post/${postId}`)
    }

    try {
      const responseAfterUploadImage = await uploadImage(imageFiles)
      const createdPostId = await createSnsPost(responseAfterUploadImage)
      goToCreatedSnsPost(createdPostId)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handlePostingSubmit}>
      <ImageUploadButton
        onImageFilesChange={handleImageFilesChange}
        buttonAriaLabel="포스트 사진 업로드"
      />
      <ItemInfomation
        onCategoryChange={handleCategoryChange}
        onPriceChange={handlePriceChange}
        onBuyingPlaceChange={handleBuyingPlaceChange}
        category={category}
        price={price}
        buyingPlace={buyingPlace}
      />
      <TextField
        label="글 내용을 작성해 주세요"
        multiline
        value={postText}
        onChange={e => handlePostTextChange(e.target.value)}
      />
      <Button variant="contained" type="submit">
        등록
      </Button>
    </form>
  )
}

export default withHeader(SnsPostPostingPage)
