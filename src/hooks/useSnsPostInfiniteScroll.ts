import { useState, useEffect, RefObject, useCallback } from 'react'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import fetchFilteredSnsPosts from 'services/snsPost/fetchFilteredSnsPosts'
import { Nullable } from 'types/common'
import { FashionStyle } from 'types/fashion'
import { SnsPostForHomePage } from 'pages/api/filtered-sns-posts'

type UseSnsPostInfiniteScrollArgs = {
  initialPageNumber: number
  pageSize: number
  isLoggedIn: boolean
  myGender: Nullable<string>
  myBodyShape: Nullable<string>
  myFashionStyles: Nullable<FashionStyle[]>
}

type UseSnsPostInfiniteScrollReturns = {
  snsPosts: SnsPostForHomePage[]
  isSnsPostsLoading: boolean
  fetchTriggerRef: RefObject<HTMLElement>
}

type UseSnsPostInfiniteScroll = (
  args: UseSnsPostInfiniteScrollArgs
) => UseSnsPostInfiniteScrollReturns

const useSnsPostInfiniteScroll: UseSnsPostInfiniteScroll = ({
  initialPageNumber,
  pageSize,
  isLoggedIn,
  myGender,
  myBodyShape,
  myFashionStyles,
}) => {
  const [snsPosts, setSnsPosts] = useState<SnsPostForHomePage[]>([])
  const [isSnsPostsLoading, setIsSnsPostsLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(initialPageNumber)
  const [pageNumberAlreadyFetched, setPageNumberAlreadyFetched] = useState(0)

  const increasePageNumber = useCallback(
    () => setPageNumber(prev => prev + 1),
    []
  )
  const fetchTriggerRef = useInfiniteScroll(increasePageNumber)

  useEffect(() => {
    if (isSnsPostsLoading) {
      return
    }

    if (pageNumber === pageNumberAlreadyFetched) {
      return
    }

    setIsSnsPostsLoading(true)
    setPageNumberAlreadyFetched(pageNumber)
    fetchFilteredSnsPosts({
      pageNumber,
      pageSize,
      isLoggedIn,
      myGender,
      myBodyShape,
      myFashionStyles,
    })
      .then(response => setSnsPosts(prev => [...prev, ...response.data]))
      .catch(console.error)
      .finally(() => setIsSnsPostsLoading(false))
  }, [
    pageNumber,
    isSnsPostsLoading,
    pageNumberAlreadyFetched,
    pageSize,
    isLoggedIn,
    myGender,
    myBodyShape,
    myFashionStyles,
  ])

  return {
    snsPosts,
    isSnsPostsLoading,
    fetchTriggerRef,
  }
}

export default useSnsPostInfiniteScroll
