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
  const editPost = async uploadedImageIds => {
    return editSnsPost({
      postId: snsPostId,
      content: postText,
      imageIds: uploadedImageIds,
      fashionItemsInfo,
    })
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

  return <form onSubmit={handleSubmit}>{children}</form>
}

export default PostEditForm
