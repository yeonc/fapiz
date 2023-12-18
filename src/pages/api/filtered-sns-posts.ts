import { NextApiRequest, NextApiResponse } from 'next'
import paginateData from 'utils/paginateData'
import getSafeStringFromQuery from 'utils/getSafeStringFromQuery'
import getSafeNumberFromQuery from 'utils/getSafeNumberFromQuery'
import { USER_FASHION_STYLES } from 'constants/user'
import { FashionStyle } from 'types/fashion'
import { Id, Nullable } from 'types/common'
import { Image } from 'types/image'
import { BodyShape, Gender, UserWithAttributes } from 'types/user'
import getFilteredSnsPosts from 'services/snsPost/getFilteredSnsPosts'

export type SnsPostForHomePage = {
  id: Id
  createdAt: string
  author: {
    username: string
    gender: Nullable<Gender>
    bodyShape: Nullable<BodyShape>
    fashionStyles: Nullable<FashionStyle[]>
  }
  postImage: Image
  likeUsers: UserWithAttributes[]
}

const filterPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req

  const pageNumber = getSafeNumberFromQuery(query.pageNumber)
  const pageSize = getSafeNumberFromQuery(query.pageSize)
  const isLoggedIn = getSafeStringFromQuery(query.isLoggedIn) === 'true'
  const myGender = getSafeStringFromQuery(query.myGender) as Nullable<Gender>
  const myBodyShape = getSafeStringFromQuery(
    query.myBodyShape
  ) as Nullable<BodyShape>
  const myFashionStyles = getSafeFashionStylesFromQuery(query.myFashionStyles)

  try {
    const filteredSnsPostsByMyInfo = await getFilteredSnsPosts({
      isLoggedIn,
      myGender,
      myBodyShape,
      myFashionStyles,
    })

    if (pageNumber && pageSize) {
      const paginatedSnsPosts = paginateData({
        dataArray: filteredSnsPostsByMyInfo,
        pageNumber,
        pageSize,
      })
      res.status(200).json(paginatedSnsPosts)
    }

    if (!pageNumber || !pageSize) {
      res.status(200).json(filteredSnsPostsByMyInfo)
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

export default filterPosts

const getSafeFashionStylesFromQuery = (
  queryValue: string | string[]
): Nullable<FashionStyle[]> => {
  if (typeof queryValue !== 'string') {
    return null
  }

  const decodedQueryValue = decodeURIComponent(queryValue)
  const parsedArray: FashionStyle[] = JSON.parse(decodedQueryValue)

  if (!(parsedArray instanceof Array)) {
    return null
  }

  const fashionStyleArray = parsedArray.filter(item => {
    if (!item.hasOwnProperty('id') || typeof item.id !== 'number') {
      return false
    }

    const FASHION_STYLE_NAMES = USER_FASHION_STYLES.map(
      fashionStyle => fashionStyle.name
    )
    if (
      !item.hasOwnProperty('name') ||
      !FASHION_STYLE_NAMES.includes(item.name)
    ) {
      return false
    }

    return true
  })

  return fashionStyleArray
}
