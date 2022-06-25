import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'
import withHeader from 'hocs/withHeader'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { css } from '@emotion/react'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import editSnsPost from 'services/users/editSnsPost'
import uploadImage from 'services/users/uploadImage'
import useSnsPost from 'hooks/useSnsPost'
import { BACKEND_URL } from 'constants/constants'
import createUrlQuery from 'utils/createUrlQuery'
import generateIdToObject from 'utils/generateIdToObject'

const EMPTY_FASHION_ITEM_INFO = { category: '', price: '', buyingPlace: '' }
const newEmptyFashionItemInfo = generateIdToObject(EMPTY_FASHION_ITEM_INFO)

const snsPostImagePreviewSize = css`
  width: 200px;
`

const query = createUrlQuery({
  populate: '*',
})

const SnsPostEditPage = () => {
  const router = useRouter()
  const { snsPostId } = router.query

  const { mutate } = useSWRConfig()

  const { snsPost } = useSnsPost(snsPostId)

  const initialPreviewImageUrls = snsPost
    ? snsPost.attributes.postImages.data.map(
        image => BACKEND_URL + image.attributes.url
      )
    : []
  const initialPostText = snsPost ? snsPost.attributes.content : ''
  const initialFashionItemsInfo = snsPost
    ? snsPost.attributes.fashionItemsInfo
    : [].concat(newEmptyFashionItemInfo)

  const [imageFiles, setImageFiles] = useState(null)
  const [previewImageUrls, setPreviewImageUrls] = useState(
    initialPreviewImageUrls
  )
  const [postText, setPostText] = useState(initialPostText)
  const [fashionItemsInfo, setFashionItemsInfo] = useState(
    initialFashionItemsInfo
  )

  useEffect(() => {
    setPreviewImageUrls(initialPreviewImageUrls)
    setPostText(initialPostText)
    setFashionItemsInfo(initialFashionItemsInfo)
  }, [snsPost])

  const setSnsPostPreviewImageUrls = imageFiles => {
    const previewImageUrls = [...imageFiles].map(imageFile =>
      URL.createObjectURL(imageFile)
    )
    setPreviewImageUrls(previewImageUrls)
  }

  const handleImageFilesChange = imageFiles => {
    setImageFiles(imageFiles)
    setSnsPostPreviewImageUrls(imageFiles)
    mutate({ url: `/api/sns-posts/${snsPostId}?${query}` })
  }

  const handlePreviewImageUrlsChange = imageUrls => {
    setPreviewImageUrls(imageUrls)
  }

  const handlePostTextChange = postText => {
    setPostText(postText)
  }

  const handleFashionItemsInfoChange = fashionItemsInfo => {
    console.log(fashionItemsInfo)
    setFashionItemsInfo(fashionItemsInfo)
  }

  const handleFashionItemInfoAddMoreButtonClick = () => {
    setFashionItemsInfo(prev => {
      return prev.concat(newEmptyFashionItemInfo)
    })
  }

  const handleFashionItemInfoDeleteButtonClick = fashionItemInfoIdToDelete => {
    setFashionItemsInfo(prev => {
      return prev.filter(prev => prev.id !== fashionItemInfoIdToDelete)
    })
  }

  const editPost = async uploadedImageIds => {
    return editSnsPost({
      postId: snsPostId,
      content: postText,
      imageIds: uploadedImageIds,
      fashionItemsInfo,
    })
  }

  const afterEditPost = () => {
    router.push(`/sns/post/${snsPostId}`)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      if (imageFiles === null) {
        await editPost()
        afterEditPost()
      }

      const res = await uploadImage(imageFiles)
      const uploadedImageIds = res.data.map(image => image.id)
      await editPost(uploadedImageIds)
      afterEditPost()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {previewImageUrls.map(previewImageUrl => (
        <img
          src={previewImageUrl}
          alt={previewImageUrl}
          onChange={handlePreviewImageUrlsChange}
          css={snsPostImagePreviewSize}
        />
      ))}
      <ImageUploadButton
        onImageFilesChange={handleImageFilesChange}
        buttonAriaLabel="SNS 게시물 수정"
      />

      <ul>
        {fashionItemsInfo.map((fashionItemInfo, fashionItemInfoIndex) => {
          const changeFashionItemsInfo = fashionItemToChange => {
            const changedFashionItemInfo = {
              ...fashionItemInfo,
              [fashionItemToChange.key]: fashionItemToChange.value,
            }

            fashionItemsInfo.splice(
              fashionItemInfoIndex,
              1,
              changedFashionItemInfo
            )

            const changedFashionItemsInfo = [...fashionItemsInfo]
            return changedFashionItemsInfo
          }

          return (
            <li key={fashionItemInfo.id}>
              <FormControl sx={{ width: 150 }}>
                <InputLabel>아이템 종류</InputLabel>
                <Select
                  label="아이템 종류"
                  value={fashionItemInfo.category}
                  onChange={e =>
                    handleFashionItemsInfoChange(
                      changeFashionItemsInfo({
                        key: 'category',
                        value: e.target.value,
                      })
                    )
                  }
                >
                  {CATEGORIES.map(category => {
                    const value =
                      category.name === '선택하지 않음' ? '' : category.name

                    return (
                      <MenuItem key={category.id} value={value}>
                        {category.name}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
              <TextField
                label="가격"
                type="number"
                value={fashionItemInfo.price}
                onChange={e =>
                  handleFashionItemsInfoChange(
                    changeFashionItemsInfo({
                      key: 'price',
                      value: e.target.value,
                    })
                  )
                }
              />
              <TextField
                label="구입처"
                value={fashionItemInfo.buyingPlace}
                onChange={e =>
                  handleFashionItemsInfoChange(
                    changeFashionItemsInfo({
                      key: 'buyingPlace',
                      value: e.target.value,
                    })
                  )
                }
              />
              <IconButton
                color="primary"
                onClick={() =>
                  handleFashionItemInfoDeleteButtonClick(fashionItemInfo.id)
                }
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            </li>
          )
        })}
      </ul>
      <Button
        variant="contained"
        onClick={handleFashionItemInfoAddMoreButtonClick}
      >
        아이템 정보 더 추가
      </Button>

      <TextField
        label="글 내용을 작성해 주세요"
        multiline
        value={postText}
        onChange={e => handlePostTextChange(e.target.value)}
      />

      <Button variant="contained" type="submit">
        수정
      </Button>
    </form>
  )
}

export default withHeader(SnsPostEditPage)

const CATEGORIES = [
  { id: '0', name: '선택하지 않음' },
  { id: '1', name: '상의' },
  { id: '2', name: '하의' },
  { id: '3', name: '원피스' },
  { id: '4', name: '아우터' },
  { id: '5', name: '신발' },
  { id: '6', name: '가방' },
  { id: '7', name: '모자' },
]
