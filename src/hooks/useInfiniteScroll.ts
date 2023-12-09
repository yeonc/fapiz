import { useEffect, useRef, RefObject } from 'react'

const useInfiniteScroll = (
  handleIntersecting: () => void
): RefObject<HTMLElement> => {
  const fetchTriggerRef = useRef<HTMLElement>(null)
  const fetchTriggerElement = fetchTriggerRef.current

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting) {
        handleIntersecting()
      }
    }
    const observer = new IntersectionObserver(handleObserver)
    if (fetchTriggerElement) {
      observer.observe(fetchTriggerElement)
    }
  }, [fetchTriggerElement, handleIntersecting])

  return fetchTriggerRef
}

export default useInfiniteScroll
