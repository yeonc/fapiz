import { useEffect, useRef, RefObject } from 'react'

const useInfiniteScroll = (
  increasePageNumber: () => void
): RefObject<HTMLElement> => {
  const fetchTriggerRef = useRef<HTMLElement>(null)
  const fetchTriggerElement = fetchTriggerRef.current

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting) {
        increasePageNumber()
      }
    }
    const observer = new IntersectionObserver(handleObserver)
    if (fetchTriggerElement) {
      observer.observe(fetchTriggerElement)
    }
  }, [fetchTriggerElement, increasePageNumber])

  return fetchTriggerRef
}

export default useInfiniteScroll
