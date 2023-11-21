import useSWR from 'swr'
import { FashionItems } from 'types/fashion'

const useFashionItems = (query: string) => {
  const { data, error } = useSWR<FashionItems, Error>({
    url: `/api/fashion-items?${query}`,
  })
  const fashionItems = data ? data.data : []

  return { fashionItems, isLoading: !data && !error, error }
}

export default useFashionItems
