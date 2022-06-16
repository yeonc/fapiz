import { useState } from 'react'
import withHeader from 'hocs/withHeader'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ImageUploadButton from 'components/common/buttons/imageUploadButton'
import ItemInfomation from 'components/sns/itemInformation'

const SnsPostPostingPage = () => {
  const [postText, setPostText] = useState('')

  const handlePostTextChange = e => {
    setPostText(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <ImageUploadButton />
      <ItemInfomation />
      <TextField
        label="글 내용을 작성해 주세요"
        multiline
        value={postText}
        onChange={handlePostTextChange}
      />
      <Button variant="contained">등록</Button>
    </form>
  )
}

export default withHeader(SnsPostPostingPage)
