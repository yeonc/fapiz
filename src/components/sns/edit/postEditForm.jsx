import editSnsPost from 'services/users/editSnsPost'
import uploadImage from 'services/users/uploadImage'

const PostEditForm = ({
  snsPostId,
  imageFiles,
  fashionItemsInfo,
  postText,
  afterEditPost,
  children,
}) => {
  const editPostWithImage = async uploadedImageIds => {
    return editSnsPost({
      postId: snsPostId,
      content: postText,
      imageIds: uploadedImageIds,
      fashionItemsInfo,
    })
  }

  const editPostWithoutImage = async () => {
    return editSnsPost({
      postId: snsPostId,
      content: postText,
      fashionItemsInfo,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      if (!imageFiles) {
        await editPostWithoutImage()
      }

      if (imageFiles) {
        const res = await uploadImage(imageFiles)
        const uploadedImageIds = res.data.map(image => image.id)
        await editPostWithImage(uploadedImageIds)
      }

      afterEditPost()
    } catch (error) {
      console.error(error)
    }
  }

  return <form onSubmit={handleSubmit}>{children}</form>
}

export default PostEditForm
