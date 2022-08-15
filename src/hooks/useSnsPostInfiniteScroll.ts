import { useState, useEffect, RefObject } from 'react'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import fetchFilteredSnsPosts from 'services/snsPost/fetchFilteredSnsPosts'
import { SnsPostForMainPage } from 'types/snsPost'
import { Nullable } from 'types/common'
import { FashionStyle } from 'types/fashion'

type UseSnsPostInfiniteScrollArgs = {
  initialPageNumber: number
  pageSize: number
  isLoggedIn: boolean
  myGender: Nullable<string>
  myBodyShape: Nullable<string>
  myFashionStyles: Nullable<FashionStyle[]>
}

type UseSnsPostInfiniteScrollReturns = {
  snsPosts: SnsPostForMainPage[]
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
  const [snsPosts, setSnsPosts] = useState<SnsPostForMainPage[]>([])
  const [isSnsPostsLoading, setIsSnsPostsLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(initialPageNumber)
  const [pageNumberAlreadyFetched, setPageNumberAlreadyFetched] = useState(0)

  const increasePageNumber = () => setPageNumber(prev => prev + 1)
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
  }, [pageNumber, isSnsPostsLoading, pageNumberAlreadyFetched])

  return {
    snsPosts,
    isSnsPostsLoading,
    fetchTriggerRef,
  }
}

export default useSnsPostInfiniteScroll
