import { useState, useEffect, RefObject, useCallback } from 'react'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import fetchFilteredSnsPosts from 'services/snsPost/fetchFilteredSnsPosts'
import { Nullable } from 'types/common'
import { FashionStyle } from 'types/fashion'
import { SnsPostForHomePage } from 'pages/api/filtered-sns-posts'
import { BodyShape, Gender } from 'types/user'
import { FilteredPosts } from 'pages'

type UseSnsPostInfiniteScrollArgs = {
  initialPageNumber: number
  pageSize: number
  isLoggedIn: boolean
  myGender: Nullable<Gender>
  myBodyShape: Nullable<BodyShape>
  myFashionStyles: Nullable<FashionStyle[]>
  filteredPosts: FilteredPosts
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
  filteredPosts,
}) => {
  const [snsPosts, setSnsPosts] = useState<SnsPostForHomePage[]>(
    filteredPosts.initialPosts
  )
  const [isSnsPostsLoading, setIsSnsPostsLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(initialPageNumber)
  const [pageNumberAlreadyFetched, setPageNumberAlreadyFetched] = useState(0)
  const [hasDynamicPosts, setHasDynamicPosts] = useState(false)
  const [isLastPage, setIsLastPage] = useState(false)

  const handleIntersecting = useCallback(() => {
    setPageNumber(prev => prev + 1)
    setHasDynamicPosts(true)
  }, [])
  const fetchTriggerRef = useInfiniteScroll(handleIntersecting)

  useEffect(() => {
    setIsLastPage(filteredPosts.total === snsPosts.length)

    if (!hasDynamicPosts || isLastPage) {
      return
    }

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
    hasDynamicPosts,
    isLastPage,
    filteredPosts.total,
    snsPosts.length,
  ])

  return {
    snsPosts,
    isSnsPostsLoading,
    fetchTriggerRef,
  }
}

export default useSnsPostInfiniteScroll
