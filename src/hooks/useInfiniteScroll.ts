import { useEffect, useRef, RefObject } from 'react'

type UseInfiniteScroll = (
  increasePageNumber: () => void
) => RefObject<HTMLElement>

const useInfiniteScroll: UseInfiniteScroll = increasePageNumber => {
  const fetchTriggerRef = useRef<HTMLElement>(null)
  const fetchTriggerElement = fetchTriggerRef.current

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0]
    if (target.isIntersecting) {
      increasePageNumber()
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver)
    if (fetchTriggerElement) {
      observer.observe(fetchTriggerElement)
    }
  }, [fetchTriggerElement])

  return fetchTriggerRef
}

export default useInfiniteScroll
