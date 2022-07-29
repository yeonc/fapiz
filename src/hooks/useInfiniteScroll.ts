import { useState, useEffect, useRef, RefObject } from 'react'
import axios, { AxiosResponse } from 'axios'
import { SnsPostForMainPage } from 'types/snsPost'

type FetchFilteredSnsPostsArgs = {
  pageNumber: number
  pageSize: number
}

type FetchFilteredSnsPosts = (
  args: FetchFilteredSnsPostsArgs
) => Promise<AxiosResponse<SnsPostForMainPage[]>>

const fetchFilteredSnsPosts: FetchFilteredSnsPosts = async ({
  pageNumber,
  pageSize,
}) => {
  return axios({
    method: 'get',
    url: '/api/filtered-sns-posts',
    params: {
      pageNumber,
      pageSize,
    },
  })
}

type UseInfiniteScrollArgs = {
  initialPageNumber: number
  pageSize: number
}

type UseInfiniteScrollReturns = {
  snsPostsToShow: SnsPostForMainPage[]
  isSnsPostsLoading: boolean
  lastSnsPostRef: RefObject<HTMLLIElement>
}

type UseInfiniteScroll = (
  args: UseInfiniteScrollArgs
) => UseInfiniteScrollReturns

const useInfiniteScroll: UseInfiniteScroll = ({
  initialPageNumber,
  pageSize,
}) => {
  const [snsPostsToShow, setSnsPostsToShow] = useState<SnsPostForMainPage[]>([])
  const [isSnsPostsLoading, setIsSnsPostsLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(initialPageNumber)

  const lastSnsPostRef = useRef<HTMLLIElement>(null)
  const lastSnsPostElement = lastSnsPostRef.current

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0]
    if (target.isIntersecting) {
      setPageNumber(prev => prev + 1)
    }
  }

  useEffect(() => {
    setIsSnsPostsLoading(true)
    fetchFilteredSnsPosts({ pageNumber, pageSize })
      .then(response => setSnsPostsToShow(prev => [...prev, ...response.data]))
      .catch(console.error)
      .finally(() => setIsSnsPostsLoading(false))
  }, [pageNumber])

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver)
    if (lastSnsPostElement) {
      observer.observe(lastSnsPostElement)
    }
  }, [lastSnsPostElement])

  return {
    snsPostsToShow,
    isSnsPostsLoading,
    lastSnsPostRef,
  }
}

export default useInfiniteScroll
