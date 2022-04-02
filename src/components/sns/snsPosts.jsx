import { useEffect, useState } from 'react'
import qs from 'qs'
import SnsPostList from '@mui/material/ImageList'
import SnsPostItem from '@mui/material/ImageListItem'
import useGetRequest from 'hooks/useGetRequest'
import { BACKEND_URL } from 'constants/constants'

const SnsPosts = ({ userId }) => {
  const [snsPosts, setSnsPosts] = useState([])

  const query = qs.stringify(
    {
      populate: '*',
      filters: {
        author: {
          id: {
            $eq: userId,
          },
        },
      },
    },
    { encodeValuesOnly: true }
  )
  const UrlForFetchingSNSPosts = `/api/sns-posts?${query}`
  const { response } = useGetRequest(BACKEND_URL, UrlForFetchingSNSPosts)

  useEffect(() => {
    if (response !== null) {
      setSnsPosts(response.data)
    }
  }, [response])

  const sanitizedSnsPosts = snsPosts?.data?.map(post => {
    const postId = post.id
    const postImageArray = post.attributes.postImage.data
    const purePostImages = postImageArray.map(postImage => postImage.attributes)

    return {
      postId,
      postImage: purePostImages,
    }
  })

  const snsPostCount = sanitizedSnsPosts?.length

  return snsPostCount === 0 ? (
    <p>작성된 포스트가 없습니다.</p>
  ) : (
    <SnsPostList sx={{ width: 650 }} cols={3}>
      {sanitizedSnsPosts?.map(post => {
        const firstImage = post.postImage[0]
        const firstImageUrl = BACKEND_URL + firstImage.url
        const firstImageAlt = firstImage.alternativeText

        return (
          <SnsPostItem key={firstImageUrl}>
            <img
              src={`${firstImageUrl}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${firstImageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={firstImageAlt}
              loading="lazy"
            />
          </SnsPostItem>
        )
      })}
    </SnsPostList>
  )
}

export default SnsPosts
